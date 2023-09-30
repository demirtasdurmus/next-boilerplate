import { NextRequest, NextResponse } from 'next/server';
import {
  IPublicRequestContext,
  publicRouter,
} from '@/app/api/_routers/public.router';
import {
  TSuccessResponse,
  buildOkResponse,
} from '@/app/api/_utils/build-success-response.util';
import { parseRequestBodyMiddleware } from '@/app/api/_middlewares/parse-request-body.middleware';
import { eq } from 'drizzle-orm';
import { db } from '@/app/api/_db';
import { BadRequestError } from '@/app/api/_errors/bad-request.error';
import * as schemas from '../../../_db/schema';
import { TLoginDto, loginDto } from '../_dto/login.dto';
import { comparePassword } from '../_utils/compare-password.util';
import { AUTH_COOKIE } from '../_constants/auth-cookie-name.constant';
import { signJWT } from '../_utils/sign-jwt.util';

export type TLoginResponse = TSuccessResponse<
  unknown,
  {
    message: string;
  }
>;

async function loginHandler(
  _req: NextRequest,
  ctx: IPublicRequestContext<TLoginDto>,
): Promise<NextResponse<TLoginResponse>> {
  // find user by email
  const user = await db.query.users.findFirst({
    where: eq(schemas.users.email, ctx.payload.email),
    columns: {
      id: true,
      email: true,
      isVerified: true,
      password: true,
      roles: true,
    },
  });

  // if not found, throw error
  if (!user) {
    throw new BadRequestError('Invalid email or password');
  }

  // if not verified, throw error // TODO: activate this later
  // if (!user.isVerified) {
  //   throw new BadRequestError('User is not verified');
  // }

  // compare password
  const isPasswordCorrect = await comparePassword({
    password: ctx.payload.password,
    hash: user.password,
  });

  // if not match, throw error
  if (!isPasswordCorrect) {
    throw new BadRequestError('Invalid email or password');
  }

  // if match, generate token
  const { JWT_EXPIRES_IN } = process.env;
  const token = await signJWT({
    payload: {
      sub: user.id,
    },
    options: {
      expiresIn: `${JWT_EXPIRES_IN}m`,
    },
  });

  // create a next response
  const res = buildOkResponse({
    data: {},
    metadata: {
      message: 'User login successful',
    },
  });

  // create an http only cookie
  const cookie = {
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: Number(JWT_EXPIRES_IN) * 60 + 1000,
    sameSite: true,
  };
  // set this token in the user cookies
  res.cookies.set(cookie);

  return res;
}

const loginRouter = publicRouter<TLoginDto>()
  .use(parseRequestBodyMiddleware(loginDto))
  .post(loginHandler);

export function POST(req: NextRequest, ctx: IPublicRequestContext<TLoginDto>) {
  return loginRouter.run(req, ctx);
}

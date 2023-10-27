import { db } from '@/app/(server)/_db';
import { BadRequestError } from '@/app/(server)/_errors/bad-request.error';
import { parseRequestBodyMiddleware } from '@/app/(server)/_middlewares/parse-request-body.middleware';
import {
  IPublicRequestContext,
  publicRouter,
} from '@/app/(server)/_routers/public.router';
import {
  TSuccessResponse,
  buildOkResponse,
} from '@/app/(server)/_utils/build-success-response.util';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import * as schemas from '../../../_db/schema';
import { AUTH_COOKIE } from '../_constants/auth-cookie-name.constant';
import { TLoginDto, loginDto } from '../_dto/login.dto';
import { comparePassword } from '../_utils/compare-password.util';
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
    data: undefined,
    meta: {
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

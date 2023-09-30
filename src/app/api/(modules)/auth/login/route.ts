import { NextRequest, NextResponse } from 'next/server';
import {
  IPublicRequestContext,
  publicRouter,
} from '@/app/api/_routers/public.router';
import { TSuccessResponse } from '@/app/api/_utils/build-success-response.util';
import { parseRequestBodyMiddleware } from '@/app/api/_middlewares/parse-request-body.middleware';
import { eq } from 'drizzle-orm';
import { db } from '@/app/api/_db';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@/app/api/_errors/bad-request.error';
import * as schemas from '../../../_db/schema';
import { TLoginDto, loginDto } from '../_dto/login.dto';
import { comparePassword } from '../_utils/compare-password.util';
import { AUTH_COOKIE } from '../_constants/auth-cookie-name.constant';

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
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  // create a next response
  const response = NextResponse.json({
    data: {},
    metadata: {
      message: 'User login successfully',
    },
  });
  // set this token in the user cookies
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
  });

  return response;
}

const loginRouter = publicRouter<TLoginDto>()
  .use(parseRequestBodyMiddleware(loginDto))
  .post(loginHandler);

export function POST(req: NextRequest, ctx: IPublicRequestContext<TLoginDto>) {
  return loginRouter.run(req, ctx);
}

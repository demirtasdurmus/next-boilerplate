import { NextRequest, NextResponse } from 'next/server';
import {
  IPublicRequestContext,
  publicRouter,
} from '@/app/api/_routers/public.router';
import {
  TSuccessResponse,
  buildOkResponse,
} from '@/app/api/_utils/build-success-response.util';
import { AUTH_COOKIE } from '../_constants/auth-cookie-name.constant';

export type TLogoutResponse = TSuccessResponse<
  unknown,
  {
    message: string;
  }
>;

async function logoutHandler(
  _req: NextRequest,
  _ctx: IPublicRequestContext,
): Promise<NextResponse<TLogoutResponse>> {
  const res = buildOkResponse({
    data: {},
    metadata: {
      message: 'User logout successful',
    },
  });

  res.cookies.set({
    name: AUTH_COOKIE,
    value: '',
    maxAge: -1,
  });
  return res;
}

const logoutRouter = publicRouter().get(logoutHandler);

export function GET(req: NextRequest, ctx: IPublicRequestContext) {
  return logoutRouter.run(req, ctx);
}

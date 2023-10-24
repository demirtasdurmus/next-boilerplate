import {
  IPublicRequestContext,
  publicRouter,
} from '@/app/(server)/_routers/public.router';
import {
  TSuccessResponse,
  buildOkResponse,
} from '@/app/(server)/_utils/build-success-response.util';
import { NextRequest, NextResponse } from 'next/server';
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

const logoutRouter = publicRouter().post(logoutHandler);

export function POST(req: NextRequest, ctx: IPublicRequestContext) {
  return logoutRouter.run(req, ctx);
}

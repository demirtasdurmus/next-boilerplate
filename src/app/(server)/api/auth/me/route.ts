import { db } from '@/app/(server)/_db';
import { Role } from '@/app/(server)/_db/schema';
import {
  IPublicRequestContext,
  publicRouter,
} from '@/app/(server)/_routers/public.router';
import {
  TSuccessResponse,
  buildOkResponse,
} from '@/app/(server)/_utils/build-success-response.util';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import * as schemas from '../../../_db/schema';
import { AUTH_COOKIE } from '../_constants/auth-cookie-name.constant';
import { verifyJWT } from '../_utils/verify-jwt.util';

export type TMeResponse = TSuccessResponse<{
  id: string;
  email: string;
  roles: Role[];
} | null>;

async function meHandler(
  _req: NextRequest,
  _ctx: IPublicRequestContext,
): Promise<NextResponse<TMeResponse>> {
  const authCookie = cookies().get(AUTH_COOKIE)?.value;
  if (!authCookie) {
    return buildOkResponse({
      data: null,
    });
  }

  // verify auth cookie
  const { valid, data } = await verifyJWT<{ sub: string }>(authCookie);

  if (!valid) {
    return buildOkResponse({
      data: null,
    });
  }

  // query user
  const user = await db.query.users.findFirst({
    where: eq(schemas.users.id, data!.sub),
    columns: {
      id: true,
      email: true,
      roles: true,
    },
  });

  // if not found, return null
  if (!user) {
    return buildOkResponse({
      data: null,
    });
  }

  // return user
  return buildOkResponse({
    data: user,
  });
}

const meRouter = publicRouter().get(meHandler);

export function GET(req: NextRequest, ctx: IPublicRequestContext) {
  return meRouter.run(req, ctx);
}

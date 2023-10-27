/* eslint-disable import/no-cycle */
import { eq } from 'drizzle-orm';
import { NextHandler } from 'next-connect';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { db } from '../_db';
import { users } from '../_db/schema';
import { NotFoundError } from '../_errors/not-found.error';
import { UnauthorizedError } from '../_errors/unauthorized.error';
import { IProtectedRequestContext } from '../_routers/protected.router';
import { AUTH_COOKIE } from '../api/auth/_constants/auth-cookie-name.constant';
import { verifyJWT } from '../api/auth/_utils/verify-jwt.util';

export async function isLoggedInMiddleware(
  _req: NextRequest,
  ctx: IProtectedRequestContext,
  next: NextHandler,
): Promise<void> {
  const token = cookies().get(AUTH_COOKIE)?.value;

  if (!token) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { valid, data } = await verifyJWT<{ sub: string }>(token);

  if (!valid || !data) {
    throw new UnauthorizedError('Unauthorized');
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, data.sub),
    columns: {
      id: true,
      username: true,
      roles: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  ctx.session = user;
  return next();
}

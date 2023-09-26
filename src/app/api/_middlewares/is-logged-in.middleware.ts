/* eslint-disable import/no-cycle */
import { NextRequest } from 'next/server';
import { NextHandler } from 'next-connect';
import { IProtectedRequestContext } from '../_routers/protected.router';
import { UnauthorizedError } from '../_errors/unauthorized.error';

export async function isLoggedInMiddleware(
  _req: NextRequest,
  ctx: IProtectedRequestContext,
  next: NextHandler,
) {
  const session = { id: 'session-id' };

  if (session.id !== 'session-id') {
    throw new UnauthorizedError('Unauthorized');
  }

  ctx.session = session;

  return next();
}

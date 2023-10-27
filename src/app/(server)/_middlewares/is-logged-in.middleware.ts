/* eslint-disable import/no-cycle */
import { NextHandler } from 'next-connect';
import { NextRequest } from 'next/server';
import { UnauthorizedError } from '../_errors/unauthorized.error';
import { IProtectedRequestContext } from '../_routers/protected.router';

export async function isLoggedInMiddleware(
  _req: NextRequest,
  ctx: IProtectedRequestContext,
  next: NextHandler,
): Promise<void> {
  const session = { id: 'session-id' };

  if (session.id !== 'session-id') {
    throw new UnauthorizedError('Unauthorized');
  }

  ctx.session = session;

  return next();
}

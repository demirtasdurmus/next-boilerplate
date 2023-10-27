/* eslint-disable import/no-cycle */
import { NextHandler } from 'next-connect';
import { NextRequest } from 'next/server';
import { IBaseRequestContext } from '../_routers/base.router';
import { logger } from '../_utils/logger.util';

export async function loggerMiddleware(
  req: NextRequest,
  _ctx: IBaseRequestContext,
  next: NextHandler,
): Promise<void> {
  if (process.env.NODE_ENV !== 'development') return next();

  const { method, url } = req;
  const log = `[${method}] ${url}`;
  logger.info(log);
  return next();
}

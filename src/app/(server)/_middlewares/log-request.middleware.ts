/* eslint-disable import/no-cycle */
import chalk from 'chalk';
import { NextHandler } from 'next-connect';
import { NextRequest } from 'next/server';
import { IBaseRequestContext } from '../_routers/base.router';

export async function loggerMiddleware(
  req: NextRequest,
  _ctx: IBaseRequestContext,
  next: NextHandler,
): Promise<void> {
  if (process.env.NODE_ENV !== 'development') return next();

  const time = new Date().toLocaleString();

  const {
    method,
    nextUrl: { pathname, protocol },
  } = req;
  const log = `${protocol.slice(0, -1)} - [${method}] - ${pathname} - ${time}`;
  // eslint-disable-next-line no-console
  console.log(`${chalk.green(log)}`);
  return next();
}

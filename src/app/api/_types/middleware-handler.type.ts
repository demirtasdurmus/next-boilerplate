import { NextRequest } from 'next/server';
import { NextHandler } from 'next-connect';
import { IPublicRequestContext } from '../_routers/public.router';

export type TMiddlewareHandler = (
  req: NextRequest,
  ctx: IPublicRequestContext,
  next: NextHandler,
) => Promise<void>;

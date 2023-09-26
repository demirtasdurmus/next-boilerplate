import { NextRequest } from 'next/server';
import { NextHandler } from 'next-connect';
import { z } from 'zod';
import { parseObject } from '../_utils/parse-object.util';
import { TMiddlewareHandler } from '../_types/middleware-handler.type';
import { IBaseRequestContext } from '../_routers/base-request-context.interface';

/**
 * Parses the request query params and attaches it to the ctx object
 * as `ctx.queryParams`.
 *
 * @export
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @return {*}  {TMiddlewareHandler}
 */
export function parseRequestQueryParamsMiddleware<T>(
  schema: z.ZodSchema<T>,
): TMiddlewareHandler {
  return async (
    req: NextRequest,
    ctx: IBaseRequestContext,
    next: NextHandler,
  ) => {
    const queryParams = Object.fromEntries(req.nextUrl.searchParams.entries());

    const { parsed } = parseObject(schema, queryParams);

    ctx.queryParams = parsed;

    return next();
  };
}

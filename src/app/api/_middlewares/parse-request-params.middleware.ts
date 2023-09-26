import { NextRequest } from 'next/server';
import { NextHandler } from 'next-connect';
import { z } from 'zod';
import { parseObject } from '../_utils/parse-object.util';
import { TMiddlewareHandler } from '../_types/middleware-handler.type';
import { IBaseRequestContext } from '../_routers/base-request-context.interface';

/**
 * Parses the request params and attaches it to the ctx object
 * as `ctx.params`.
 *
 * @export
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @return {*}  {TMiddlewareHandler}
 */
export function parseRequestParamsMiddleware<T>(
  schema: z.ZodSchema<T>,
): TMiddlewareHandler {
  return async (
    _req: NextRequest,
    ctx: IBaseRequestContext,
    next: NextHandler,
  ) => {
    const { parsed } = parseObject(schema, ctx.params);
    ctx.params = parsed;
    return next();
  };
}

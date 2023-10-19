import { NextHandler } from 'next-connect';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { IBaseRequestContext } from '../_routers/base-request-context.interface';
import { TMiddlewareHandler } from '../_types/middleware-handler.type';
import { parseObject } from '../_utils/parse-object.util';

/**
 * Parses the request body using the provided schema.
 * If the request body is invalid, it will throw an error.
 * If the request body is valid, it will be parsed and added to the request context.
 *
 * @export
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @return {*}  {TMiddlewareHandler}
 */
export function parseRequestBodyMiddleware<T>(
  schema: z.ZodSchema<T>,
): TMiddlewareHandler {
  return async (
    _req: NextRequest,
    ctx: IBaseRequestContext,
    next: NextHandler,
  ) => {
    const { parsed } = parseObject(schema, ctx.payload);
    ctx.payload = parsed;
    return next();
  };
}

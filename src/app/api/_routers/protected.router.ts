/* eslint-disable import/no-cycle */
import { createEdgeRouter } from 'next-connect';
import { NextRequest } from 'next/server';
import { handleGlobalErrorMiddleware } from '../_middlewares/handle-global-error.middleware';
import { parseJsonMiddleware } from '../_middlewares/parse-json.middleware';
import { isLoggedInMiddleware } from '../_middlewares/is-logged-in.middleware';
import { IBaseRequestContext } from './base-request-context.interface';

export interface IProtectedRequestContext<
  TPayload = unknown,
  TParams = unknown,
  TQueryParams = unknown,
> extends IBaseRequestContext {
  payload: TPayload;
  params: TParams;
  queryParams: TQueryParams;
  // TODO: Add session type
  session: Record<string, string>;
}

/**
 * Creates a protected router.
 * This router will handle global errors and parse the request body as JSON.
 * It will also check if the user is logged in.
 *
 * @export
 * @template TPayload
 * @template TParams
 * @template TQueryParams
 * @return {*}
 */
export function protectedRouter<
  TPayload = unknown,
  TParams = unknown,
  TQueryParams = unknown,
>() {
  return createEdgeRouter<
    NextRequest,
    IProtectedRequestContext<TPayload, TParams, TQueryParams>
  >()
    .use(handleGlobalErrorMiddleware)
    .use(parseJsonMiddleware)
    .use(isLoggedInMiddleware);
  // TODO: Add session middleware
}

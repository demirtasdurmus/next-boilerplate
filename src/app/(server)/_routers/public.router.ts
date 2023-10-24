/* eslint-disable import/no-cycle */
import { createEdgeRouter } from 'next-connect';
import { NextRequest } from 'next/server';
import { handleGlobalErrorMiddleware } from '../_middlewares/handle-global-error.middleware';
import { parseJsonMiddleware } from '../_middlewares/parse-json.middleware';
import { IBaseRequestContext } from './base-request-context.interface';

export interface IPublicRequestContext<
  TPayload = unknown,
  TParams = unknown,
  TQueryParams = unknown,
> extends IBaseRequestContext {
  payload: TPayload;
  params: TParams;
  queryParams: TQueryParams;
}

/**
 * Creates a public router.
 * This router will handle global errors and parse the request body as JSON.
 *
 * @export
 * @template TPayload
 * @template TParams
 * @template TQueryParams
 * @return {*}
 */
export function publicRouter<
  TPayload = unknown,
  TParams = unknown,
  TQueryParams = unknown,
>() {
  return createEdgeRouter<
    NextRequest,
    IPublicRequestContext<TPayload, TParams, TQueryParams>
  >()
    .use(handleGlobalErrorMiddleware)
    .use(parseJsonMiddleware);
}

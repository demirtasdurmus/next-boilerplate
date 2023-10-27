/* eslint-disable import/no-cycle */
import { createEdgeRouter } from 'next-connect';
import { NextRequest } from 'next/server';
import { handleGlobalErrorMiddleware } from '../_middlewares/handle-global-error.middleware';
import { loggerMiddleware } from '../_middlewares/log-request.middleware';
import { parseJsonMiddleware } from '../_middlewares/parse-json.middleware';

export interface IBaseRequestContext<
  TPayload = unknown,
  TParams = unknown,
  TQueryParams = unknown,
> {
  payload: TPayload;
  params: TParams;
  queryParams: TQueryParams;
}

/**
 * Creates a base router.
 * This router is used as a base for all other routers.
 * It contains all the global middlewares.
 * It logs all requests.
 * It parses all json requests.
 * All other routers should extend this router.
 * This router should not be used directly.
 *
 * @export
 * @template T
 * @return {*}
 */
export function baseRouter<T extends IBaseRequestContext>() {
  return (
    createEdgeRouter<NextRequest, T>()
      // add global middlewares here
      .use(handleGlobalErrorMiddleware)
      .use(loggerMiddleware)
      .use(parseJsonMiddleware)
  );
}

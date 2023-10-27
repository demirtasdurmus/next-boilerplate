/* eslint-disable import/no-cycle */
import { isLoggedInMiddleware } from '../_middlewares/is-logged-in.middleware';
import { IBaseRequestContext, baseRouter } from './base.router';

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
  return baseRouter<
    IProtectedRequestContext<TPayload, TParams, TQueryParams>
  >().use(isLoggedInMiddleware);
}

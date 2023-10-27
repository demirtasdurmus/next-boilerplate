/* eslint-disable import/no-cycle */
import { isLoggedInMiddleware } from '../_middlewares/is-logged-in.middleware';
import { TSession } from '../_types/session.type';
import { IBaseRequestContext, baseRouter } from './base.router';

export interface IProtectedRequestContext<
  TPayload = unknown,
  TParams = unknown,
  TQueryParams = unknown,
> extends IBaseRequestContext {
  payload: TPayload;
  params: TParams;
  queryParams: TQueryParams;
  session: TSession;
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

import { IBaseRequestContext, baseRouter } from './base.router';

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
  return baseRouter<IPublicRequestContext<TPayload, TParams, TQueryParams>>();
}

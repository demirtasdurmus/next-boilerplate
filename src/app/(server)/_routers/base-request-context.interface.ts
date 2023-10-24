export interface IBaseRequestContext<
  TPayload = unknown,
  TParams = unknown,
  TQueryParams = unknown,
> {
  payload: TPayload;
  params: TParams;
  queryParams: TQueryParams;
}

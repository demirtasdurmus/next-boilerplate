import { NextResponse } from 'next/server';

export type TErrorResponse = {
  statusCode: number;
  status: 'error' | 'fail';
  errorMessage: string;
  /** Following attribute is available only in non-prod environments, so don't use in the client code */
  name?: string;
  /** Following attribute is available only in non-prod environments, so don't use in the client code */
  stack?: string;
};

/**
 * Build error response
 * This function is used to build error response
 *
 * @export
 * @param {{
 *   message: string;
 *   statusCode: number;
 *   name?: string;
 *   stack?: string;
 * }} error
 * @return {*}  {NextResponse<TErrorResponse>}
 */
export function buildErrorResponse(error: {
  statusCode: number;
  errorMessage: string;
  name?: string;
  stack?: string;
}): NextResponse<TErrorResponse> {
  return new NextResponse(
    JSON.stringify({
      statusCode: error.statusCode,
      status: error.statusCode < 500 ? 'fail' : 'error',
      errorMessage: error.errorMessage,
      name: error.name,
      stack: error.stack,
    } satisfies TErrorResponse),
    {
      status: error.statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

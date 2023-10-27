/* eslint-disable import/no-cycle */
import { NextHandler } from 'next-connect';
import { NextRequest } from 'next/server';
import { BaseError } from '../_errors/base.error';
import { serializeError } from '../_errors/serialize-error.util';
import { IBaseRequestContext } from '../_routers/base.router';
import { buildErrorResponse } from '../_utils/build-error-response.util';

/**
 * Handles global errors and returns a JSON response.
 * If the error is a 4xx error, the response will be a `fail` response.
 * If the error is a 5xx error, the response will be an `error` response.
 * Also logs the error to the console.
 * Which can be logged to a service like Sentry, Datadog, Rollbar, etc. in production.
 *
 * @export
 * @param {NextRequest} _req
 * @param {IBaseRequestContext} _ctx
 * @param {NextHandler} next
 * @return {*} {Promise<void>}
 */
export async function handleGlobalErrorMiddleware(
  _req: NextRequest,
  _ctx: IBaseRequestContext,
  next: NextHandler,
): Promise<void> {
  return next().catch((err: any) => {
    let serializedError: BaseError;
    if (err instanceof BaseError) {
      serializedError = err;
    } else {
      serializedError = serializeError(err);
    }
    // If current env is production
    // log the error if it's not operational
    if (process.env.NODE_ENV === 'production') {
      // TODO: log error to a service like Sentry, Datadog, Rollbar, etc instead of console.
      // eslint-disable-next-line no-console
      if (!serializedError.isOperational) console.error(serializedError);
      return buildErrorResponse({
        statusCode: serializedError.statusCode,
        errorMessage: serializedError.isOperational
          ? serializedError.message
          : 'An error occurred.',
      });
    }
    // if current env is not production
    // log the error to the console for debugging
    // eslint-disable-next-line no-console
    console.error('💥💥💥\n', serializedError, '\n💥💥💥');
    return buildErrorResponse({
      statusCode: serializedError.statusCode,
      name: serializedError.name,
      errorMessage: serializedError.message,
      stack: serializedError.stack,
    });
  });
}

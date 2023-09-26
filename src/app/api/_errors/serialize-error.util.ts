import { BaseError } from './base.error';

export function serializeError(error: any): BaseError {
  // TODO: add logic to serialize error for different instances of error
  return new BaseError(
    error.message || 'An error occurred',
    error.statusCode || 500,
    error.isOperational || false,
    error.name || 'UnknownError',
    error.stack,
  );
}

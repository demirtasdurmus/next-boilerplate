import { baseError } from './error-names.constant';

export class BaseError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public isOperational: boolean = true,
    public name: string = baseError,
    public stack?: string,
  ) {
    super(message);
    if (!this.stack) Error.captureStackTrace(this, this.constructor);
  }
}

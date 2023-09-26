import { BaseError } from './base.error';
import { badRequestError } from './error-names.constant';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400, true, badRequestError);
  }
}

import { BaseError } from './base.error';
import { internalServerError } from './error-names.constant';

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(message, 500, false, internalServerError);
  }
}

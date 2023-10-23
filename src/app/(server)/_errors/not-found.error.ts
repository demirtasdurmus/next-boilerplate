import { BaseError } from './base.error';
import { notFoundError } from './error-names.constant';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404, true, notFoundError);
  }
}

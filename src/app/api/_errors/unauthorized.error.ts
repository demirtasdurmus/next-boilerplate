import { BaseError } from './base.error';
import { unauthorizedError } from './error-names.constant';

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401, true, unauthorizedError);
  }
}

import { BaseError } from './base.error';
import { conflictError } from './error-names.constant';

export class ConflictError extends BaseError {
  constructor(message: string) {
    super(message, 409, true, conflictError);
  }
}

import { PostgresError } from 'postgres';
import { z } from 'zod';
import { capitalizeInitialLetter } from '../_utils/capitalize-initial-letter.util';
import { getUniqueColumnFromConstraintName } from '../_utils/get-unique-column-from-constraint-name';
import { BadRequestError } from './bad-request.error';
import { BaseError } from './base.error';
import { ConflictError } from './conflict.error';
import { PgErrorCode } from './pg-error-code.enum';

export function serializeError(error: any): BaseError {
  // handle ZodErrors
  if (error instanceof z.ZodError) {
    const errorMessage = error.issues.map((issue) => issue.message).join(', ');
    return new BadRequestError(errorMessage);
  }
  // handle PostgresErrors
  if (error.name === 'PostgresError') {
    const _err = error as PostgresError;
    switch (_err.code) {
      case PgErrorCode.UNIQUE_VIOLATION:
        return new ConflictError(
          `${capitalizeInitialLetter(
            getUniqueColumnFromConstraintName(_err.constraint_name),
          )} already exists`,
        );
      // TODO: add more cases for different PostgresError codes as needed
      default:
        return new BaseError(_err.message, 500, false, _err.name, _err.stack);
    }
  }

  return new BaseError(
    error.message || 'An error occurred',
    error.statusCode || 500,
    error.isOperational || false,
    error.name || 'UnknownError',
    error.stack,
  );
}

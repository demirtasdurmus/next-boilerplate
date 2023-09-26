import { z } from 'zod';
import { BadRequestError } from '../_errors/bad-request.error';

type TValidateObjectResult<T> = {
  parsed: T;
};

/**
 * parseObject
 * Parses an object using a Zod schema.
 *
 * @export  parseObject
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @param {unknown} raw
 * @return {*}  {TValidateObjectResult<T>}
 * @throws {BadRequestError}
 * @throws {Error}
 */
export function parseObject<T>(
  schema: z.ZodSchema<T>,
  raw: unknown,
): TValidateObjectResult<T> {
  try {
    return { parsed: schema.parse(raw) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue) => issue.message)
        .join(', ');
      throw new BadRequestError(errorMessage);
    }
    throw error;
  }
}

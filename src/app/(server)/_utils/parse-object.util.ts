import { z } from 'zod';

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
 */
export function parseObject<T>(
  schema: z.ZodSchema<T>,
  raw: unknown,
): TValidateObjectResult<T> {
  return { parsed: schema.parse(raw) };
}

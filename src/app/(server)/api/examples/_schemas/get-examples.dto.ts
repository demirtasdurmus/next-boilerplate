import { z } from 'zod';

export const defaultGetExamplesLimit = 10;

export const getExamplesDto = z.object({
  page: z.preprocess(
    (a) => parseInt(z.string().default('1').parse(a), 10),
    z
      .number({ invalid_type_error: 'Page must be a number' })
      .positive()
      .max(100),
  ),
  limit: z.preprocess(
    (a) =>
      parseInt(
        z.string().default(defaultGetExamplesLimit.toString()).parse(a),
        10,
      ),
    z
      .number({ invalid_type_error: 'Limit must be a number' })
      .positive()
      .max(100),
  ),
  q: z.string().optional().default(''),
});

export type TGetExamplesDto = z.infer<typeof getExamplesDto>;

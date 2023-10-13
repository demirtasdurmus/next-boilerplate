import { z } from 'zod';

export const getExamplesDto = z.object({
  page: z.preprocess(
    (a) => parseInt(z.string().default('1').parse(a), 10),
    z
      .number({ invalid_type_error: 'Page must be a number' })
      .positive()
      .max(100),
  ),
  limit: z.preprocess(
    (a) => parseInt(z.string().default('10').parse(a), 10),
    z
      .number({ invalid_type_error: 'Limit must be a number' })
      .positive()
      .max(100),
  ),
});

export type TGetExamplesDto = z.infer<typeof getExamplesDto>;

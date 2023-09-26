import { z } from 'zod';

export const exampleIdSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required',
    })
    .uuid({
      message: 'Id must be a valid uuid',
    }),
});

export type TExampleId = z.infer<typeof exampleIdSchema>;

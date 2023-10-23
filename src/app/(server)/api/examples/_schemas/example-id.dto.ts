import { z } from 'zod';

export const exampleIdDto = z.object({
  id: z
    .string({
      required_error: 'Id is required',
    })
    .uuid({
      message: 'Id must be a valid uuid',
    }),
});

export type TExampleIdDto = z.infer<typeof exampleIdDto>;

import { z } from 'zod';

export const createExampleDto = z.object(
  {
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
  },
  {
    required_error: 'Body is required',
  },
);

export type TCreateExampleDto = z.infer<typeof createExampleDto>;

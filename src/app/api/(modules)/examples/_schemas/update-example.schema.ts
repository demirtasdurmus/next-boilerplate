import { z } from 'zod';

export const updateExampleSchema = z.object(
  {
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    description: z.string().optional(),
  },
  {
    required_error: 'Body is required',
  },
);

export type TUpdateExample = z.infer<typeof updateExampleSchema>;

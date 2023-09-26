import { z } from 'zod';

export const createExampleSchema = z.object(
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

export type TCreateExample = z.infer<typeof createExampleSchema>;

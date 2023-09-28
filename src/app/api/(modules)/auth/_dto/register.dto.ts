import { z } from 'zod';
import { strongPasswordDto } from './strong-password.dto';

export const registerDto = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: strongPasswordDto,
    confirmPassword: z.string({
      required_error: 'Password confirm is required',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type TRegisterDto = z.infer<typeof registerDto>;

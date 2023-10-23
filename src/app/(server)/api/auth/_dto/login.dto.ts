import { z } from 'zod';
import { strongPasswordDto } from './strong-password.dto';

export const loginDto = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: strongPasswordDto,
});

export type TLoginDto = z.infer<typeof loginDto>;

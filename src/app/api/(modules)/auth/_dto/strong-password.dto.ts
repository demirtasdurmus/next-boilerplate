import { z } from 'zod';

export const strongPasswordDto = z
  .string({ required_error: 'Password is required' })
  .min(8, {
    message: 'Password must be at least 8 characters long',
  })
  .refine(
    (password) => {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/;
      return strongPasswordRegex.test(password);
    },
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol.',
    },
  );

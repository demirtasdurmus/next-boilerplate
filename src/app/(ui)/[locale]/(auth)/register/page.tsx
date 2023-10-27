'use client';

import {
  TRegisterDto,
  registerDto,
} from '@/app/(server)/api/auth/_dto/register.dto';
import { TRegisterResponse } from '@/app/(server)/api/auth/register/route';
import { Button } from '@/components/shared/button';
import { Input } from '@/components/shared/input';
import { register } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Register() {
  const router = useRouter();
  const form = useForm<TRegisterDto>({
    resolver: zodResolver(registerDto),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: mutateRegister, status } = useMutation({
    mutationFn: (data: TRegisterDto) => register(data),
    onSuccess: (metadata: TRegisterResponse['meta']) => {
      router.push('/login');
      toast.success(metadata.message);
    },
  });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-16">
      {/* Heading */}
      <h1 className="my-8 text-2xl font-bold">Register</h1>
      {/* Form */}
      <form
        className="w-full space-y-6 md:w-1/3"
        onSubmit={form.handleSubmit((data) => mutateRegister(data))}
      >
        <Input
          type="text"
          inputName="Email"
          placeholder="Email"
          validationError={form.formState.errors.email?.message}
          {...form.register('email')}
        />
        <Input
          type="password"
          inputName="Password"
          placeholder="Password"
          validationError={form.formState.errors.password?.message}
          {...form.register('password')}
        />
        <Input
          type="password"
          inputName="Confirm Password"
          placeholder="Confirm Password"
          validationError={form.formState.errors.confirmPassword?.message}
          {...form.register('confirmPassword')}
        />
        <Button
          type="submit"
          content={'Register'}
          loading={status === 'loading'}
          disabled={status === 'loading'}
          onClick={form.handleSubmit((data) => mutateRegister(data))}
        />
      </form>
      {/* Login Link */}
      <Link
        className="my-2 text-sm font-bold text-blue-500 hover:text-blue-600"
        href="/login"
      >
        Already have an account? Login
      </Link>
    </div>
  );
}

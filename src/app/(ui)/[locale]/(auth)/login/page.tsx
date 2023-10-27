'use client';

import { TLoginDto, loginDto } from '@/app/(server)/api/auth/_dto/login.dto';
import { TLoginResponse } from '@/app/(server)/api/auth/login/route';
import { Button } from '@/components/shared/button';
import { Input } from '@/components/shared/input';
import { login } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const form = useForm<TLoginDto>({
    resolver: zodResolver(loginDto),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: mutateLogin, status } = useMutation({
    mutationFn: (data: TLoginDto) => login(data),
    onSuccess: (metadata: TLoginResponse['meta']) => {
      // used this one over next router to hard refresh
      window.location.href = '/';
      toast.success(metadata.message);
    },
  });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-16">
      {/* Heading */}
      <h1 className="my-8 text-2xl font-bold">Login</h1>
      {/* Form */}
      <form
        onSubmit={form.handleSubmit((data) => mutateLogin(data))}
        className="w-full space-y-6 md:w-1/3"
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
        <Button
          type="submit"
          content={'Login'}
          loading={status === 'loading'}
          disabled={status === 'loading'}
          onClick={form.handleSubmit((data) => mutateLogin(data))}
        />
      </form>
      {/* Register Link */}
      <Link
        className="my-2 text-sm font-bold text-blue-500 hover:text-blue-600"
        href="/register"
      >
        Don&apos;t have an account? Register
      </Link>
    </div>
  );
}

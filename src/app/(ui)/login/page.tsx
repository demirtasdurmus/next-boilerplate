/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { TLoginDto, loginDto } from '@/app/api/(modules)/auth/_dto/login.dto';
import { TLoginResponse } from '@/app/api/(modules)/auth/login/route';
import { login } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function Login() {
  const form = useForm<TLoginDto>({
    resolver: zodResolver(loginDto),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: mutateLogin, status } = useMutation({
    mutationFn: (data: TLoginDto) => login(data),
    onSuccess: (metadata: TLoginResponse['metadata']) => {
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
        {/* Input Element Email */}
        <div className="">
          <label htmlFor="email" className="flex flex-col items-center">
            Email
            <input
              id="email"
              type="text"
              placeholder="Email"
              className={clsx(
                'w-full rounded-xl border-2 p-2 px-4 text-black focus:outline-none',
                form.formState.errors.email
                  ? 'border-red-500'
                  : 'border-grey-300 hover:border-gray-400 focus:border-gray-600',
              )}
              {...form.register('email')}
            />
          </label>
          <p className="ml-1 text-xs text-red-500">
            {form.formState.errors.email?.message}
          </p>
        </div>
        {/* Input Element Password */}
        <div className="">
          <label htmlFor="password" className="flex flex-col items-center">
            Password
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={clsx(
                'w-full rounded-xl border-2 p-2 px-4 text-black focus:outline-none',
                form.formState.errors.password
                  ? 'border-red-500'
                  : 'border-grey-300 hover:border-gray-400 focus:border-gray-600',
              )}
              {...form.register('password')}
            />
          </label>
          <p className="ml-1 text-xs text-red-500">
            {form.formState.errors.password?.message}
          </p>
        </div>
        {/* Button */}
        <button
          type="submit"
          className={clsx(
            'flex h-12 w-full cursor-pointer items-center justify-center rounded-full border-2 border-white  p-2 text-white hover:bg-red-500',
            status === 'loading' ? 'bg-red-300' : 'bg-red-400',
          )}
          onClick={form.handleSubmit((data) => mutateLogin(data))}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <BeatLoader color="#f2f2f2" className="" size={12} />
          ) : (
            'Login'
          )}
        </button>
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

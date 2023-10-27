import { TLoginDto } from '@/app/(server)/api/auth/_dto/login.dto';
import { TRegisterDto } from '@/app/(server)/api/auth/_dto/register.dto';
import { TLoginResponse } from '@/app/(server)/api/auth/login/route';
import { TLogoutResponse } from '@/app/(server)/api/auth/logout/route';
import { TMeResponse } from '@/app/(server)/api/auth/me/route';
import { HttpClient } from '@/lib/http-client';

const httpClient = new HttpClient({ modulePrefix: 'auth' });

export async function register({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return httpClient
    .post<TLoginResponse>({
      url: '/register',
      data: {
        email,
        password,
        confirmPassword,
      } satisfies TRegisterDto,
    })
    .then((res) => res.data.meta);
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return httpClient
    .post<TLoginResponse>({
      url: '/login',
      data: {
        email,
        password,
      } satisfies TLoginDto,
    })
    .then((res) => res.data.meta);
}

export async function logout() {
  return httpClient
    .post<TLogoutResponse>({
      url: '/logout',
    })
    .then((res) => res.data.meta);
}

export async function fetchMe() {
  return httpClient
    .get<TMeResponse>({
      url: '/me',
    })
    .then((res) => res.data.data);
}

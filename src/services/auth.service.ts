import { TLoginDto } from '@/app/api/(modules)/auth/_dto/login.dto';
import { TRegisterDto } from '@/app/api/(modules)/auth/_dto/register.dto';
import { TLoginResponse } from '@/app/api/(modules)/auth/login/route';
import { TLogoutResponse } from '@/app/api/(modules)/auth/logout/route';
import { HttpClient } from '@/lib/http-client';

const httpClient = new HttpClient({ modulePrefix: 'auth' });

export async function mutateRegister({
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
    .then((res) => res.data.metadata);
}

export async function mutateLogin({
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
    .then((res) => res.data.metadata);
}

export async function mutateLogout() {
  return httpClient
    .get<TLogoutResponse>({
      url: '/logout',
    })
    .then((res) => res.data.metadata);
}

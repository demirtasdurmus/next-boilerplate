import { TLoginDto } from '@/app/api/(modules)/auth/_dto/login.dto';
import { TLoginResponse } from '@/app/api/(modules)/auth/login/route';
import { HttpClient } from '@/lib/http-client';

const httpClient = new HttpClient({ modulePrefix: 'auth' });

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

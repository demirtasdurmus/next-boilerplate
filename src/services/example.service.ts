import { TGetExamplesResponse } from '@/app/api/(modules)/examples/route';
import { HttpClient } from '@/lib/http-client';

const httpClient = new HttpClient({ modulePrefix: 'examples' });

export async function fetchExamples({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return httpClient
    .get<TGetExamplesResponse>({
      url: '/',
      params: {
        page,
        limit,
      },
    })
    .then((res) => res.data.data);
}

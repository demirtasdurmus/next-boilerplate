import { TGetExampleByIdResponse } from '@/app/api/(modules)/examples/[id]/route';
import { TGetExamplesDto } from '@/app/api/(modules)/examples/_schemas/get-examples.dto';
import { TGetExamplesResponse } from '@/app/api/(modules)/examples/route';
import { HttpClient } from '@/lib/http-client';

const httpClient = new HttpClient({ modulePrefix: 'examples' });

export async function fetchExamples({
  page,
  limit,
  q,
}: {
  page: number;
  limit: number;
  q?: string;
}) {
  return httpClient
    .get<TGetExamplesResponse>({
      url: '/',
      params: {
        page,
        limit,
        q,
      } satisfies TGetExamplesDto,
    })
    .then((res) => res.data.data);
}

export async function fetchExampleById(id: string) {
  return httpClient
    .get<TGetExampleByIdResponse>({
      url: `/${id}`,
    })
    .then((res) => res.data.data);
}

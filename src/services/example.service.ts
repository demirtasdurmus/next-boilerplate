import { TGetExampleByIdResponse } from '@/app/(server)/api/examples/[id]/route';
import { TGetExamplesDto } from '@/app/(server)/api/examples/_schemas/get-examples.dto';
import { TGetExamplesResponse } from '@/app/(server)/api/examples/route';
import { HttpClient } from '@/lib/http-client';

const httpClient = new HttpClient({ modulePrefix: 'examples' });

export async function fetchExamples({ page, limit, q }: TGetExamplesDto & {}) {
  return httpClient
    .get<TGetExamplesResponse>({
      url: '/',
      params: {
        page,
        limit,
        q,
      } satisfies TGetExamplesDto,
    })
    .then((res) => res.data);
}

export async function fetchExampleById(id: string) {
  return httpClient
    .get<TGetExampleByIdResponse>({
      url: `/${id}`,
    })
    .then((res) => res.data.data);
}

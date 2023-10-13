import { TGetExamplesResponse } from '@/app/api/(modules)/examples/route';
import { HttpClient } from '@/lib/http-client';
import { useQuery } from '@tanstack/react-query';

const httpClient = new HttpClient();

export const useGetExamples = () =>
  useQuery({
    queryKey: ['examples'],
    queryFn: async () =>
      httpClient
        .get<TGetExamplesResponse>({ url: '/examples' })
        .then((res) => res.data.data),
  });

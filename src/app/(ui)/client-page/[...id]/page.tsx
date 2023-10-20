'use client';

import { fetchExampleById } from '@/services/example.service';
import { useQuery } from '@tanstack/react-query';

/* This pattern is used to demonstrate the Catch-all segment */
type Props = {
  params: {
    id: [string];
  };
};

export default function ClientPageDetail({ params }: Props) {
  const { data: example, status } = useQuery({
    queryKey: ['examples', params.id[0]],
    queryFn: () => fetchExampleById(params.id[0]),
    staleTime: 1000,
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">
      <h1 className="text-3xl">ClientPageDetail - {params.id}</h1>

      {example && (
        <section className="flex flex-col gap-4 p-4 text-xl">
          <h1 className="font-bold text-red-500">{example.title}</h1>
          <p>{example.description}</p>
        </section>
      )}
    </div>
  );
}

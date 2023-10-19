'use client';

import { fetchExamples } from '@/services/example.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

const examplesQKey = 'examples';
const limit = 2;

export default function SearchPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { status, data } = useQuery({
    queryKey: [examplesQKey, page, limit],
    queryFn: () => fetchExamples({ page, limit }),
    staleTime: 1000,
  });

  useEffect(() => {
    const newPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: [examplesQKey, newPage, limit],
      queryFn: () => fetchExamples({ page: newPage, limit }),
    });
  }, [data, page, queryClient]);

  if (status === 'loading') {
    return <PulseLoader />;
  }

  return (
    <div>
      <div className="mb-8">Current Page: {page}</div>
      <div className="border border-gray-600 p-4">
        {status === 'success' && JSON.stringify(data)}
      </div>
      <div className="my-16">
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous Page
        </button>{' '}
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

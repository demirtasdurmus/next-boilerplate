'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Pagination() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  const router = useRouter();
  const [page, setPage] = useState(1);

  useEffect(() => {
    router.push(`/server-page?page=${page}&q=${q}`);
  }, [page, q, router]);

  return (
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
  );
}

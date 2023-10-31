'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Props = {
  totalPages: number;
  hasMore: boolean;
};

export default function Pagination({ totalPages, hasMore }: Props) {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;
  const q = searchParams.get('q') || '';

  const router = useRouter();
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    router.push(`/server-page?page=${page}&q=${q}`);
  }, [page, q, router]);

  return (
    <div className="flex space-x-2">
      <button
        type="button"
        className="flex items-center rounded-3xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      >
        <FaChevronLeft />
        Prev
      </button>
      <span className="rounded-full bg-gray-400 p-2">
        {pageParam <= totalPages ? pageParam : totalPages}/{totalPages}
      </span>
      <button
        type="button"
        className="flex items-center rounded-3xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => hasMore && setPage((prev) => prev + 1)}
      >
        Next
        <FaChevronRight />
      </button>
    </div>
  );
}

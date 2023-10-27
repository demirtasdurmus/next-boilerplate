'use client';

import {
  useChangeLocale,
  useCurrentLocale,
  useI18n,
  useScopedI18n,
} from '@/locales/utils/client';
import { fetchExamples } from '@/services/example.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

const examplesQKey = 'examples';
const limit = 2;

export default function ClientPage() {
  /* Localization Utils */
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const t = useI18n();
  const scopedT = useScopedI18n('hello');

  /* Others */
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { status, data } = useQuery({
    queryKey: [examplesQKey, page, limit],
    queryFn: () => fetchExamples({ page, limit, q: '' }),
    staleTime: 1000,
  });

  useEffect(() => {
    const newPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: [examplesQKey, newPage, limit],
      queryFn: () => fetchExamples({ page: newPage, limit, q: '' }),
    });
  }, [data, page, queryClient]);

  if (status === 'loading') {
    return <PulseLoader />;
  }

  return (
    <div className="mx-24 mt-12 flex flex-col gap-8">
      <h1 className="text-5xl">Products</h1>
      <div className="mb-8">Current Page: {page}</div>
      {/* Localization Example */}
      {/* Changing */}
      <div className="flex gap-3">
        <p>Current locale: {locale}</p>
        <button
          onClick={() => changeLocale('en')}
          className="rounded-lg bg-blue-400 p-2 hover:bg-blue-500"
        >
          English
        </button>
        <button
          onClick={() => changeLocale('tr')}
          className="rounded-lg bg-blue-400 p-2 hover:bg-blue-500"
        >
          Turkish
        </button>
      </div>
      {/* Using */}
      <div className="mb-8">
        <p>{t('hello.world', { param: <strong>John</strong> })}</p>
        <p>{scopedT('nested.translations')}</p>
      </div>
      {/* Localization end */}
      <div className="border border-gray-600 p-4">
        {status === 'success' &&
          data.data.map((item, idx) => (
            <div key={item.id} className="flex gap-4">
              <p>{idx + 1}.</p>
              <Link href={`/client-page/${item.id}`} className="font-bold">
                {item.title}
              </Link>
              <p>{item.description}</p>
            </div>
          ))}
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

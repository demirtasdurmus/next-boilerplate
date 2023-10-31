import { defaultGetExamplesLimit } from '@/app/(server)/api/examples/_schemas/get-examples.dto';
import { TGetExamplesResponse } from '@/app/(server)/api/examples/route';
import { getScopedI18n } from '@/locales/utils/server';
import { fetchExamples } from '@/services/example.service';
import { notFound } from 'next/navigation';
import Examples from './components/examples';
import Pagination from './components/pagination';
import SearchBar from './components/search-bar';

type Props = {
  searchParams: {
    page: number | undefined;
    q: string | undefined;
  };
};

export default async function Products({ searchParams }: Props) {
  const st = await getScopedI18n('ServerPage');
  const { page = 1, q = '' } = searchParams;

  let examples: TGetExamplesResponse['data'] = [];
  let meta: TGetExamplesResponse['meta'];
  try {
    const res = await fetchExamples({
      page,
      limit: defaultGetExamplesLimit,
      q,
    });
    examples = res.data;
    meta = res.meta;
  } catch (error: any) {
    if (error.status === 'fail') return notFound();
    throw error;
  }

  return (
    <div className="mx-3 my-6 flex flex-col items-center gap-8 md:mx-6">
      <h1 className="text-xl md:text-3xl">{st('title')}</h1>
      <SearchBar />
      <Examples examples={examples} />
      {q && <Pagination hasMore={meta.hasMore} totalPages={meta.totalPages} />}
    </div>
  );
}

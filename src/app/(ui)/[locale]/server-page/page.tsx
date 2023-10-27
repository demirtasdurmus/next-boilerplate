import { defaultGetExamplesLimit } from '@/app/(server)/api/examples/_schemas/get-examples.dto';
import { TGetExamplesResponse } from '@/app/(server)/api/examples/route';
import { getScopedI18n } from '@/locales/utils/server';
import { fetchExamples } from '@/services/example.service';
import { notFound } from 'next/navigation';
import ExampleCard from './components/example-card';
import Pagination from './components/pagination';

type Props = {
  searchParams: {
    page: number | undefined;
    limit: number | undefined;
    q: string | undefined;
  };
};

export default async function Products({ searchParams }: Props) {
  const st = await getScopedI18n('ServerPage');
  const { page = 1, limit = defaultGetExamplesLimit, q = '' } = searchParams;

  let examples: TGetExamplesResponse['data'] = [];
  let meta: TGetExamplesResponse['meta'];
  try {
    const res = await fetchExamples({ page, limit, q });
    examples = res.data;
    meta = res.meta;
  } catch (error: any) {
    if (error.status === 'fail') return notFound();
    throw error;
  }

  return (
    <div className="mx-24 my-12 flex flex-col items-center gap-8">
      {/* Title */}
      <h1 className="text-3xl">{st('title')}</h1>

      {/* Examples */}
      <div className="flex w-full flex-wrap justify-center gap-8">
        {examples.map((example, idx) => (
          <ExampleCard
            idx={idx}
            id={example.id}
            key={example.id}
            title={example.title}
            imageUri=""
            width={200}
            height={120}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination hasMore={meta.hasMore} totalPages={meta.totalPages} />
    </div>
  );
}

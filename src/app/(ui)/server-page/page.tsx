import { TGetExamplesResponse } from '@/app/(server)/api/examples/route';
import { fetchExamples } from '@/services/example.service';
import Pagination from './pagination';

type Props = {
  searchParams: {
    page: number;
    limit: number;
    q: string;
  };
};

const limit = 2;

export default async function Products({ searchParams }: Props) {
  const page = searchParams.page || 1;
  const q = searchParams.q || '';

  let products: TGetExamplesResponse['data'] = [];
  products = await fetchExamples({ page, limit, q });

  return (
    <div className="mx-24 mt-12 flex flex-col gap-8">
      <h1 className="text-xl">{JSON.stringify(products)}</h1>
      <Pagination />
    </div>
  );
}

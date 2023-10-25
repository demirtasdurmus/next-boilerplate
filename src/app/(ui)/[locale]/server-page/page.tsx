import { TGetExamplesResponse } from '@/app/(server)/api/examples/route';
import {
  getCurrentLocale,
  getI18n,
  getScopedI18n,
} from '@/locales/utils/server';
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
  /* Localization Utils */
  const locale = getCurrentLocale();
  const t = await getI18n();
  const scopedT = await getScopedI18n('hello');

  /* Others */
  const page = searchParams.page || 1;
  const q = searchParams.q || '';

  let products: TGetExamplesResponse['data'] = [];
  products = await fetchExamples({ page, limit, q });

  return (
    <div className="mx-24 mt-12 flex flex-col gap-8">
      <h1 className="text-xl">{JSON.stringify(products)}</h1>
      {/* Localization Example */}
      <div>
        <p className="text-3xl">Current locale: {locale}</p>
        <p>{t('hello.world', { param: 'John' })}</p>
        <p>{scopedT('nested.translations')}</p>
        <p>{t('hello.world', { param: <strong>John</strong> })}</p>
        {/* Output: No cows */}
        <p>{t('apples', { count: 0 })}</p>
        {/* Output: A cow */}
        <p>{t('apples', { count: 1 })}</p>
        {/* Output: 3 cows */}
        <p>{t('apples', { count: 3 })}</p>
      </div>
      <Pagination />
    </div>
  );
}

import Link from 'next/link';
import { Suspense } from 'react';
import SearchPage from './search-page';

export default function Products() {
  return (
    <div className="mx-24 mt-12 flex flex-col gap-8">
      <h1 className="text-5xl">Products</h1>
      <SearchPage />
      {/* Suspense example, Divides code into chunks,
       so react doesn't wait for the whole page to hydrate,
       the server streams the pre-rendered content and react hydrates them in chunks */}
      <Suspense fallback={<p>Loading Product list</p>}>
        {/* <ProductList /> */}
        <p>This is a server component that fetches data before prerender</p>
      </Suspense>
      <Link
        href="/products/unique-id?showDialog=y"
        className="text-3xl underline"
      >
        Go to Product with Modal
      </Link>

      <Link href="/products/unique-id" className="text-3xl underline">
        Go to Products without Modal
      </Link>
    </div>
  );
}

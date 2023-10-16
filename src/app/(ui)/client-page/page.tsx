import Link from 'next/link';
import SearchPage from './search-page';

export default function Products() {
  return (
    <div className="mx-24 mt-12 flex flex-col gap-8">
      <h1 className="text-5xl">Products</h1>
      <SearchPage />
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

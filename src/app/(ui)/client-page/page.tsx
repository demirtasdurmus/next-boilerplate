import SearchPage from './search-page';

export default function ClientPage() {
  return (
    <div className="mx-24 mt-12 flex flex-col gap-8">
      <h1 className="text-5xl">Products</h1>
      <SearchPage />
    </div>
  );
}

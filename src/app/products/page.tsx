import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="text-5xl">Home</h1>

      <Link
        href="/products/unique-id?showDialog=y"
        className="text-3xl underline"
      >
        Go to Product with Modal
      </Link>

      <Link href="/products/unique-id" className="text-3xl underline">
        Go to Products without Modal
      </Link>
    </>
  );
}

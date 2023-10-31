'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/server-page?page=1&q=${query}`);
    setQuery('');
  };

  return (
    <form className="flex justify-center md:w-1/3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for something..."
        className="border-grey-300 w-full rounded-xl border-2 p-2 px-4 text-black hover:border-gray-400 focus:border-gray-600 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-white  bg-red-400 p-2 text-white hover:bg-red-500"
        type="submit"
      >
        Go
      </button>
    </form>
  );
}

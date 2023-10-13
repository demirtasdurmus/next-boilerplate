import { useAuthContext } from '@/context';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

type Props = {
  menuItems: {
    id: string;
    name: string;
    href: string;
  }[];
};

export default function MobileMenu({ menuItems }: Props) {
  const { loading, session, logout } = useAuthContext();

  return (
    <div className="absolute left-6 right-6 mt-10 flex flex-col items-center space-y-6 self-end bg-white py-8 font-bold drop-shadow-md sm:w-auto sm:self-center md:hidden">
      {menuItems.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className="hover:text-blue-400 hover:underline"
        >
          {item.name}
        </Link>
      ))}
      {session === null && (
        <Link href="/login" className="hover:text-blue-400 hover:underline">
          Login
        </Link>
      )}
      {session && (
        <button
          type="button"
          className="mr-3 flex cursor-pointer items-center gap-1 hover:text-blue-400 hover:underline"
          onClick={logout}
        >
          <Image
            src="/logout.svg"
            width={0}
            height={0}
            alt="logout"
            sizes="100vw"
            className="h-full w-4"
          />
          Logout
        </button>
      )}
      {loading && (
        <div className="h-4 w-16 animate-pulse rounded-md bg-gray-300"> </div>
      )}
    </div>
  );
}

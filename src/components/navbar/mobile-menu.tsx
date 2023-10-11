import Link from 'next/link';
import React from 'react';

type Props = {
  menuItems: {
    id: string;
    name: string;
    href: string;
  }[];
};

export default function MobileMenu({ menuItems }: Props) {
  return (
    <div className="md:hidden">
      <div className="absolute left-6 right-6 mt-10 flex flex-col items-center space-y-6 self-end bg-white py-8 font-bold drop-shadow-md sm:w-auto sm:self-center">
        {menuItems.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className="hover:text-blue-400 hover:underline"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

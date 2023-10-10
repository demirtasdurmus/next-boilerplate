import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {
  menuItems: {
    id: string;
    name: string;
    href: string;
  }[];
};

export default function Menu({ menuItems }: Props) {
  return (
    <div className={clsx('hidden', 'space-x-10', 'md:flex')}>
      {menuItems.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={clsx(
            'text-xl',
            'font-bold',
            'hove:bg-black-4',
            'hover:text-blue-400',
            'hover:underline',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

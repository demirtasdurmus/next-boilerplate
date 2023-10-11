import Link from 'next/link';
import React from 'react';

type Props = {
  menuItems: {
    id: string;
    name: string;
    href: string;
  }[];
};

export default function DesktopMenu({ menuItems }: Props) {
  return (
    <div className="hidden space-x-10 md:flex">
      {menuItems.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className="text-xl font-bold hover:text-blue-400 hover:underline"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

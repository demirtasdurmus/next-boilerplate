'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  menuItems: {
    id: string;
    name: string;
    href: string;
  }[];
};

export default function DesktopMenu({ menuItems }: Props) {
  const pathname = usePathname();

  return (
    <div className="hidden space-x-10 md:flex">
      {menuItems.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={clsx(
            'text-xl font-bold',
            pathname === item.href
              ? 'cursor-default underline'
              : 'hover:text-blue-400',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

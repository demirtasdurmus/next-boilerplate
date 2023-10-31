'use client';

import Image from 'next/image';
import Link from 'next/link';
import Menu from './menu';

export default function Header() {
  return (
    <header className="flex items-center justify-between border bg-[#fcfcfc] px-4 py-4">
      {/* Logo */}
      <Link href="/">
        <Image src="/next.svg" width={200} height={20} alt="logo" />
      </Link>

      {/* Menu */}
      <Menu />
    </header>
  );
}

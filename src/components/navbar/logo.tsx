import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <div className={clsx('pt-2')}>
      <Link href="/">
        <Image
          src="/next.svg"
          width={0}
          height={0}
          alt="next-logo"
          sizes="100vw"
          className={clsx('h-auto', 'w-32')}
        />
      </Link>
    </div>
  );
}

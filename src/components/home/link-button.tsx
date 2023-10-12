import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  href: string;
  className?: string;
};

export default function LinkButton({ name, href, className }: Props) {
  return (
    <div className={clsx(className)}>
      <Link
        href={href}
        className="rounded-full bg-red-400 p-3 px-6 font-bold text-white hover:bg-red-300"
      >
        {name}
      </Link>
    </div>
  );
}

LinkButton.defaultProps = {
  className: '',
};

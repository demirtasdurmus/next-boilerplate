import React from 'react';
import Image from 'next/image';

export default function Visual() {
  return (
    <div className="md:w-1/2">
      <Image
        src="illustration-intro.svg"
        width={0}
        height={0}
        alt="Logo"
        sizes="100vw"
        className="mx-auto h-full w-10/12 md:mx-0 md:w-full"
        priority
      />
    </div>
  );
}

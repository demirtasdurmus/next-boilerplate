import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Copyright from './copyright';

type Props = {
  socials: {
    id: string;
    name: string;
    icon: string;
    url: string;
  }[];
};

export default function LogoAndSocials({ socials }: Props) {
  return (
    <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:items-start md:space-y-0">
      {/* Copyright in small screens */}
      <Copyright className="mx-auto my-6 text-center text-white md:hidden" />
      {/* Logo */}
      <Link href="/" className="mb-4">
        <Image
          src="/next-white.svg"
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-40"
        />
      </Link>
      {/* Socials */}
      <div className="flex justify-center space-x-4">
        {socials.map((social) => (
          <a href={social.url} key={social.id}>
            <Image
              src={social.icon}
              alt={social.name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-6"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

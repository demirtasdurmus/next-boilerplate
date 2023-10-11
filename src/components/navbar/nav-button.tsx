import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { BeatLoader } from 'react-spinners';

type Props = {
  isLoggedIn: boolean | null;
  handleLogout: () => void;
};

export default function NavButton({ isLoggedIn, handleLogout }: Props) {
  const buttonClassName = clsx(
    'hidden',
    'md:block',
    'bg-red-400',
    'rounded-full',
    'p-3',
    'px-10',
    'text-white',
    'hover:bg-red-300',
    'font-bold',
  );

  if (isLoggedIn === true) {
    return (
      <button className={buttonClassName} type="submit" onClick={handleLogout}>
        Logout
      </button>
    );
  }

  if (isLoggedIn === false) {
    return (
      <Link href="/login" className={buttonClassName}>
        Login
      </Link>
    );
  }

  return (
    <div className={buttonClassName}>
      <BeatLoader color="#f2f2f2" className="" size={10} />
    </div>
  );
}

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { BeatLoader } from 'react-spinners';

type Props = {
  isLoggedIn: boolean | null;
  handleLogout: () => void;
};

export default function Button({ isLoggedIn, handleLogout }: Props) {
  if (isLoggedIn === true) {
    return (
      <button
        className={clsx(
          'hidden',
          'md:block',
          'bg-red-400',
          'rounded-full',
          'p-3',
          'px-10',
          'text-white',
          'hover:bg-red-300',
          'font-bold',
        )}
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  }

  if (isLoggedIn === false) {
    return (
      <Link
        href="/login"
        className={clsx(
          'hidden',
          'md:block',
          'bg-red-400',
          'rounded-full',
          'p-3',
          'px-10',
          'text-white',
          'hover:bg-red-300',
          'font-bold',
        )}
      >
        Login
      </Link>
    );
  }

  return (
    <div
      className={clsx(
        'hidden',
        'md:block',
        'bg-red-400',
        'rounded-full',
        'p-3',
        'px-10',
        'text-white',
        'hover:bg-red-300',
        'font-bold',
      )}
    >
      <BeatLoader color="#f2f2f2" className="" size={10} />
    </div>
  );
}

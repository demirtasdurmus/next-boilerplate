'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

interface Props {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn = true }: Props) {
  const router = useRouter();
  const handleLogout = () => {
    axios
      .get('/api/auth/logout')
      .then((res) => {
        if (res.status === 200) {
          router.push('/login');
          toast.success(res.data.metadata.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.metadata.message);
      });
  };
  return (
    <header className="w-96 bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Your App Name</h1>
        <div>
          {isLoggedIn ? (
            <button
              className="rounded-md bg-red-500 px-4 py-2 text-white"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-green-500 px-4 py-2 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

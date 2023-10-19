'use client';

import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<'loading' | 'true' | 'false'>(
    'loading',
  );

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

  const getMe = () => {
    axios
      .get('/api/auth/me')
      .then((res) => {
        if (res.data.data) {
          setIsLoggedIn('true');
        } else {
          setIsLoggedIn('false');
        }
      })
      .catch((err) => {
        setIsLoggedIn('false');
        toast.error(err.response.data.errorMessage);
      });
  };

  useEffect(() => {
    getMe();
  }, [pathname]);

  return (
    <header className="w-96 bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Your App Name</h1>
        <div>
          {isLoggedIn === 'true' && (
            <button
              className="rounded-md bg-red-500 px-4 py-2 text-white"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          {isLoggedIn === 'false' && (
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

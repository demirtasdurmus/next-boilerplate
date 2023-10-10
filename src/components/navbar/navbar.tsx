'use client';

import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Button from './button';
import Menu from './menu';
import Logo from './logo';

const menuItems = [
  {
    id: '1',
    name: 'Home',
    href: '/',
  },
  {
    id: '2',
    name: 'About',
    href: '/about',
  },
  {
    id: '3',
    name: 'Contact',
    href: '/contact',
  },
  {
    id: '4',
    name: 'Products',
    href: '/products',
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

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
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        toast.error(err.response.data.errorMessage);
      });
  };

  useEffect(() => {
    getMe();
  }, [pathname]);

  return (
    /* Navbar */
    <nav className={clsx('container', 'mx-auto', 'p-6')}>
      {/* Flex container */}
      <div className={clsx('flex', 'justify-between')}>
        {/* Logo */}
        <Logo />
        {/* Menu */}
        <Menu menuItems={menuItems} />
        {/* Button */}
        <Button isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

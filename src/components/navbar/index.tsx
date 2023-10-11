'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import NavButton from './nav-button';
import DesktopMenu from './desktop-menu';
import CompanyLogo from './company-logo';
import HamburgerButton from './hamburger-button';
import MobileMenu from './mobile-menu';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    getMe();
  }, [pathname]);

  return (
    /* Navbar */
    <nav className="container relative mx-auto p-6">
      {/* Flex container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <CompanyLogo />
        {/* Menu */}
        <DesktopMenu menuItems={menuItems} />
        {/* Button */}
        <NavButton isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        {/* Hamburger Icon */}
        <HamburgerButton handleMobileMenuToggle={handleMobileMenuToggle} />
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu menuItems={menuItems} />}
    </nav>
  );
}

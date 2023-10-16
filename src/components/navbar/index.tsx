'use client';

import React, { useState } from 'react';
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
    name: 'Client Page',
    href: '/client-page',
  },
  {
    id: '4',
    name: 'Server Page',
    href: '/server-page',
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="container relative mx-auto p-6">
      {/* Flex container */}
      <div className="flex items-center justify-between">
        <CompanyLogo />
        <DesktopMenu menuItems={menuItems} />
        <NavButton />
        <HamburgerButton handleMobileMenuToggle={handleMobileMenuToggle} />
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu menuItems={menuItems} />}
    </nav>
  );
}

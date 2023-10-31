'use client';

/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import Hamburger from '../shared/hamburger';
import CompanyLogo from './company-logo';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import NavButton from './nav-button';

const menuItems = [
  {
    id: '1',
    name: 'Home',
    href: '/',
  },
  {
    id: '2',
    name: 'Features',
    href: '#features',
  },
  {
    id: '3',
    name: 'Testimonials',
    href: '#testimonials',
  },
  {
    id: '4',
    name: 'Client Page',
    href: '/client-page',
  },
  {
    id: '5',
    name: 'Server Page',
    href: '/server-page',
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="container relative mx-auto p-6">
      {/* Screen listener to toggle when clicked outside */}
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20"
          onClick={toggle}
        ></div>
      )}

      {/* Flex container */}
      <div className="flex items-center justify-between">
        <CompanyLogo />
        <DesktopMenu menuItems={menuItems} />
        <NavButton />
        <Hamburger toggle={toggle} isOpen={isOpen} />
      </div>

      {/* Mobile Menu */}
      {isOpen && <MobileMenu menuItems={menuItems} />}
    </nav>
  );
}

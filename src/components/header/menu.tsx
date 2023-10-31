'use client';

/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { AuthContext } from '@/context/auth-context';
import { useContext, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import Hamburger from '../shared/hamburger';
import DropdownItem from './dropdown-item';
import MenuButton from './menu-button';

export default function Menu() {
  const { session, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const handleLogout = () => {
    logout();
    toggle();
  };

  const transClass = isOpen ? 'flex' : 'hidden';

  return (
    <div className="flex items-center gap-8 text-white">
      {/* Screen listener to toggle when clicked outside */}
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20"
          onClick={toggle}
        ></div>
      )}
      <div className="relative">
        {/* Desktop Menu button */}
        <MenuButton toggle={toggle} isOpen={isOpen} />

        {/* Mobile Menu button */}
        <Hamburger toggle={toggle} isOpen={isOpen} />

        {/* Dropdown */}
        <div
          className={`absolute right-0 top-14 z-30 flex w-[150px] flex-col rounded-md border bg-[#fcfcfc] py-2 ${transClass}`}
        >
          {session ? (
            <>
              <DropdownItem
                key={'1'}
                item={{ route: '/account', title: 'Account' }}
                toggle={toggle}
              />
              <DropdownItem
                key={'2'}
                item={{ route: '/settings', title: 'Settings' }}
                toggle={toggle}
              />

              {/* Logout Button */}
              <hr className="mb-2 h-1/2 bg-black" />
              <button
                className="flex items-center gap-2 self-start py-1 pl-4 text-black hover:text-blue-200"
                type="button"
                onClick={handleLogout}
              >
                <FaArrowCircleRight />
                Logout
              </button>
            </>
          ) : (
            <>
              <DropdownItem
                key={'1'}
                item={{ route: '/login', title: 'Login' }}
                toggle={toggle}
              />
              <DropdownItem
                key={'2'}
                item={{ route: '/register', title: 'Register' }}
                toggle={toggle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

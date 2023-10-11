import React from 'react';
import LogoAndSocials from './logo-and-socials';
import ListContainer from './list-container';
import InputContainer from './input-container';

const socials = [
  {
    id: '1',
    name: 'Facebook',
    icon: '/icon-facebook.svg',
    url: 'https://www.facebook.com',
  },
  {
    id: '2',
    name: 'YouTube',
    icon: '/icon-youtube.svg',
    url: 'https://www.youtube.com',
  },
  {
    id: '3',
    name: 'Twitter',
    icon: '/icon-twitter.svg',
    url: 'https://twitter.com',
  },
  {
    id: '4',
    name: 'Pinterest',
    icon: 'icon-pinterest.svg',
    url: 'https://www.pinterest.com',
  },
  {
    id: '5',
    name: 'Instagram',
    icon: '/icon-instagram.svg',
    url: 'https://www.instagram.com',
  },
];

const footerList = [
  {
    id: '1',
    name: 'Home',
    href: '/',
  },
  {
    id: '2',
    name: 'Pricing',
    href: '/pricing',
  },
  {
    id: '3',
    name: 'Products',
    href: '/products',
  },
  {
    id: '4',
    name: 'About Us',
    href: '/about',
  },
  {
    id: '5',
    name: 'Careers',
    href: '/careers',
  },
  {
    id: '6',
    name: 'Community',
    href: '/community',
  },
  {
    id: '7',
    name: 'Privacy Policy',
    href: '/privacy-policy',
  },
];

export default function Footer() {
  return (
    <footer className="bg-darkBlue">
      {/* Flex Container */}
      <div className="container mx-auto flex flex-col-reverse justify-between space-y-8 px-6 py-10 md:flex-row md:space-y-0">
        {/* Logo and Socials */}
        <LogoAndSocials socials={socials} />
        {/* List Container */}
        <ListContainer footerList={footerList} />
        {/* Input Container */}
        <InputContainer />
      </div>
    </footer>
  );
}

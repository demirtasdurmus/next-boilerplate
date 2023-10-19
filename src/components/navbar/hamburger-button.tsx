import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  handleMobileMenuToggle: () => void;
};

export default function HamburgerButton({ handleMobileMenuToggle }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    handleMobileMenuToggle();
  };

  return (
    <button
      className={clsx(
        'hamburger block focus:outline-none md:hidden',
        isOpen ? 'open' : '',
      )}
      type="button"
      onClick={handleButtonClick}
    >
      <span className="hamburger-top">{/*  */}</span>
      <span className="hamburger-middle">{/*  */}</span>
      <span className="hamburger-bottom">{/*  */}</span>
    </button>
  );
}

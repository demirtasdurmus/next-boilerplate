import clsx from 'clsx';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function Hamburger({ isOpen, toggle }: Props) {
  return (
    <button
      className={clsx(
        'hamburger block focus:outline-none md:hidden',
        isOpen ? 'open' : '',
      )}
      type="button"
      onClick={toggle}
    >
      <span className="hamburger-top">{/*  */}</span>
      <span className="hamburger-middle">{/*  */}</span>
      <span className="hamburger-bottom">{/*  */}</span>
    </button>
  );
}

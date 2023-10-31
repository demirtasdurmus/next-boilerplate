import { AuthContext } from '@/context/auth-context';
import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function MenuButton({ isOpen, toggle }: Props) {
  const { loading, session } = useContext(AuthContext);
  const buttonClassName = clsx(
    'hidden',
    'md:block',
    'text-black',
    'rounded-full',
    'p-3',
    'px-10',
    'hover:bg-gray-200',
    'font-bold',
    'border',
  );

  if (loading) {
    return (
      <div className={buttonClassName}>
        <BeatLoader color="#f2f2f2" className="" size={10} />
      </div>
    );
  }

  if (session) {
    return (
      <button className={buttonClassName} onClick={toggle}>
        <div className="flex items-center">
          {session.email.split('@')[0]}{' '}
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </button>
    );
  }

  return (
    <Link href="/login" className={buttonClassName}>
      Login
    </Link>
  );
}

import { useAuthContext } from '@/context';
import clsx from 'clsx';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';

export default function NavButton() {
  const { loading, session, logout } = useAuthContext();

  const buttonClassName = clsx(
    'hidden',
    'md:block',
    'bg-red-400',
    'rounded-full',
    'p-3',
    'px-10',
    'text-white',
    'hover:bg-red-300',
    'font-bold',
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
      <button className={buttonClassName} type="submit" onClick={logout}>
        Logout
      </button>
    );
  }

  return (
    <Link href="/login" className={buttonClassName}>
      Login
    </Link>
  );
}

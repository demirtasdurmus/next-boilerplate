import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  /* This is a server component but we can make it a client component if needed */
  return (
    <section>
      {/* <div className="hidden">
        {'This is a shared UI across the Auth pages'}
      </div> */}
      {children}
    </section>
  );
}

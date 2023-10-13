'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './auth-context';

type Props = {
  children: ReactNode;
};

export default function Context({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { useAuthContext } from './auth-context';

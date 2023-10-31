'use client';

import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';

export default function Layout({
  children,
  analytics,
  team,
  authenticated,
  unauthenticated,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
  authenticated: React.ReactNode;
  unauthenticated: React.ReactNode;
}) {
  const { loading, session } = useContext(AuthContext);
  // eslint-disable-next-line no-nested-ternary
  const AuthComponent = loading ? (
    <div>Loading...</div>
  ) : session ? (
    authenticated
  ) : (
    unauthenticated
  );
  return (
    <div className="m-6 flex gap-8">
      {children}
      {team}
      {analytics}
      {AuthComponent}
    </div>
  );
}

'use client';

import { TLogoutResponse } from '@/app/(server)/api/auth/logout/route';
import { TMeResponse } from '@/app/(server)/api/auth/me/route';
import { fetchMe, logout } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  loading: boolean;
  session: TMeResponse['data'];
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  loading: true,
  session: null,
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<TMeResponse['data']>(null);

  // used api fn instead of useQuery
  // because useQuery will cause more rerenders
  const getMe = () => {
    fetchMe()
      .then((data) => {
        setSession(data);
      })
      .catch(() => {
        setSession(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const { mutate: mutateLogout } = useMutation({
    mutationFn: () => logout(),
    onSuccess: (metadata: TLogoutResponse['meta']) => {
      setSession(null);
      toast.success(metadata.message);
    },
  });

  useEffect(() => {
    getMe();
  }, []);

  const props: AuthContextProps = useMemo(
    () => ({
      loading,
      session,
      logout: () => mutateLogout(),
    }),
    [loading, session, mutateLogout],
  );

  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}

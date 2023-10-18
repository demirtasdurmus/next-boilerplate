'use client';

import { TLogoutResponse } from '@/app/api/(modules)/auth/logout/route';
import { TMeResponse } from '@/app/api/(modules)/auth/me/route';
import { fetchMe, logout } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  loading: boolean;
  session: TMeResponse['data'];
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
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

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (metadata: TLogoutResponse['metadata']) => {
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
      logout: () => logoutMutation.mutate(),
    }),
    [loading, session, logoutMutation],
  );

  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);

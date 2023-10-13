'use client';

import { TLogoutResponse } from '@/app/api/(modules)/auth/logout/route';
import { TMeResponse } from '@/app/api/(modules)/auth/me/route';
import { mutateLogout } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<TMeResponse['data']>(null);

  // used axios instead of mutateGetMe
  // because mutateGetMe will cause one more rerender
  // because of its status variety
  const getMe = () => {
    axios
      .get<TMeResponse>('/api/auth/me')
      .then((res) => {
        setSession(res.data.data);
      })
      .catch(() => {
        setSession(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logoutMutation = useMutation({
    mutationFn: () => mutateLogout(),
    onSuccess: (metadata: TLogoutResponse['metadata']) => {
      setSession(null);
      toast.success(metadata.message);
    },
  });

  useEffect(() => {
    getMe();
  }, [pathname]);

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

'use client';

import { TMeResponse } from '@/app/api/(modules)/auth/me/route';
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

  const logout = () => {
    axios
      .get('/api/auth/logout')
      .then(() => {
        setSession(null);
      })
      .catch(() => {
        toast.error('Failed to logout');
        setSession(null);
      });
  };

  useEffect(() => {
    getMe();
  }, [pathname]);

  const props: AuthContextProps = useMemo(
    () => ({
      loading,
      session,
      logout,
    }),
    [loading, session],
  );

  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);

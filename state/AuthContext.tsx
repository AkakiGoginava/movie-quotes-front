import { createContext, useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  useAuthMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
} from '@/hooks';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
} from '@/services';

import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryKey, setQueryKey] = useState(['user']);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: getUser,
    staleTime: 0,
    retry: false,
    select: (data) => {
      return data?.data || null;
    },
  });

  const handleRegister = useAuthMutation(registerUser, {
    onSuccess: () => {
      setQueryKey(['user', Math.random().toString(36).substring(2)]);
    },
  });

  const handleLogin = useAuthMutation(loginUser, {
    onSuccess: () => {
      setQueryKey(['user', Math.random().toString(36).substring(2)]);
    },
  });

  const handleLogout = useLogoutMutation(logoutUser, {
    onSuccess: () => {
      setQueryKey(['user', Math.random().toString(36).substring(2)]);
    },
  });

  const handleVerifyEmail = useVerifyEmailMutation(verifyEmail, {
    onSuccess: () => {
      setQueryKey(['user', Math.random().toString(36).substring(2)]);
    },
  });

  const errorStatus = (error as any)?.status;
  const currentUser: any =
    !isLoading && (!error || errorStatus != 401) ? user : null;

  return (
    <AuthContext.Provider
      value={{
        user: currentUser?.user,
        isVerified: !!currentUser?.user?.email_verified_at,
        isLoading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleVerifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

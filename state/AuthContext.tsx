import { createContext, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthMutation, useLogoutMutation } from '@/hooks';
import { getUser, loginUser, logoutUser, registerUser } from '@/services';

import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 0,
    retry: false,
    enabled: !isLoggedOut,
    select: (data) => {
      return data?.data || null;
    },
  });

  const handleRegister = useAuthMutation(registerUser, {
    onSuccess: () => {
      setIsLoggedOut(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleLogin = useAuthMutation(loginUser, {
    onSuccess: () => {
      setIsLoggedOut(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleLogout = useLogoutMutation(logoutUser, {
    onSuccess: () => {
      setIsLoggedOut(true);
      queryClient.removeQueries({ queryKey: ['user'] });
    },
  });

  const errorStatus = (error as any)?.status;
  const currentUser: any = isLoggedOut
    ? null
    : !isLoading && (!error || errorStatus != 401)
      ? user
      : null;

  return (
    <AuthContext.Provider
      value={{
        user: currentUser?.user,
        isVerified: !!currentUser?.user?.email_verified_at,
        isLoading,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { createContext } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthMutation, useLogoutMutation } from '@/hooks';
import { getUser, loginUser, logoutUser, registerUser } from '@/services';

import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
    retry: false,
    select: (data) => data?.data || null,
  });

  const currentUser =
    error && (error as any)?.response?.status === 401 ? null : user;

  const handleRegister = useAuthMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleLogin = useAuthMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleLogout = useLogoutMutation(logoutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: currentUser ?? null,
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

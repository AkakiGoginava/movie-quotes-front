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

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
    retry: false,
  });

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

  const handleLogout = useLogoutMutation(logoutUser);

  return (
    <AuthContext.Provider
      value={{
        user: user?.data,
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

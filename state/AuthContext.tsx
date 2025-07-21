import { createContext, useEffect } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  useAuthMutation,
  useSimpleMutation,
  useVerifyEmailMutation,
} from '@/hooks';
import {
  forgotPassword,
  getUser,
  googleCallback,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyEmail,
} from '@/services';
import { User } from '@/types';

import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<AxiosResponse<{ user: User }>>({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
    retry: false,
  });

  const user = data?.data?.user || null;

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

  const handleGoogleAuth = (options?: { onSuccess?: () => void }) =>
    useSimpleMutation(googleCallback, options);

  const handleLogout = useSimpleMutation(logoutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleVerifyEmail = useVerifyEmailMutation(verifyEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleForgotPassword = (options?: { onSuccess?: () => void }) =>
    useAuthMutation(forgotPassword, options);

  const handleResetPassword = (options?: { onSuccess?: () => void }) =>
    useAuthMutation(resetPassword, options);

  const errorStatus = (error as AxiosError)?.status;
  const currentUser: User | null =
    !isLoading && (!error || errorStatus != 401) ? user : null;

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isVerified: !!currentUser?.email_verified_at,
        isLoading,
        handleRegister,
        handleLogin,
        handleGoogleAuth,
        handleLogout,
        handleVerifyEmail,
        handleForgotPassword,
        handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

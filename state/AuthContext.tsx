import { createContext } from 'react';

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
    select: (data) => {
      return data?.data || null;
    },
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

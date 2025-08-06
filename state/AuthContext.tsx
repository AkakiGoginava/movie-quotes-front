import { createContext } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  useFormMutation,
  useSimpleMutation,
  useVerifyEmailMutation,
} from '@/hooks';
import {
  editUser,
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

  const handleRegister = useFormMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleLogin = useFormMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleGoogleAuthFactory = (options?: { onSuccess?: () => void }) => {
    return useSimpleMutation(googleCallback, options);
  };

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

  const handleForgotPasswordFactory = (options?: {
    onSuccess?: () => void;
  }) => {
    return useFormMutation(forgotPassword, options);
  };

  const handleResetPasswordFactory = (options?: { onSuccess?: () => void }) => {
    return useFormMutation(resetPassword, options);
  };

  const handleEditUserFactory = (options?: { onSuccess?: () => void }) => {
    return useFormMutation(editUser, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['user'] });

        options?.onSuccess?.();
      },
    });
  };

  const errorStatus = (error as AxiosError)?.status;
  const currentUser: User | null =
    !isLoading && (!error || errorStatus != 401) ? user : null;

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isVerified: !!currentUser?.email_verified_at,
        isGoogleUser: !!currentUser?.google_id,
        isLoading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleVerifyEmail,
        handleGoogleAuthFactory,
        handleForgotPasswordFactory,
        handleResetPasswordFactory,
        handleEditUserFactory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

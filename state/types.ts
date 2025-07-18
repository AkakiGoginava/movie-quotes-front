import { Dispatch, SetStateAction } from 'react';

import { UseFormSetError } from 'react-hook-form';

import {
  AuthInputFieldType,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
} from '@/types';

export type AuthContextType = {
  user: any;
  isLoading: boolean;
  isVerified: boolean;
  handleRegister: (
    formData: RegisterInput,
    setError: UseFormSetError<RegisterInput>,
    inputs: AuthInputFieldType<RegisterInput>[],
  ) => Promise<void>;
  handleLogin: (
    formData: LoginInput,
    setError: UseFormSetError<LoginInput>,
    inputs: AuthInputFieldType<LoginInput>[],
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleVerifyEmail: (
    token: string,
    setSuccessNotificationOpen: Dispatch<SetStateAction<boolean>>,
    setInvalidTokenNotificationOpen: Dispatch<SetStateAction<boolean>>,
  ) => void;
  handleForgotPassword: (options?: {
    onSuccess?: () => void;
  }) => (
    formData: ForgotPasswordInput,
    setError: UseFormSetError<ForgotPasswordInput>,
    inputs: AuthInputFieldType<ForgotPasswordInput>[],
  ) => Promise<void>;
};

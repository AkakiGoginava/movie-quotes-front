import { Dispatch, SetStateAction } from 'react';

import { UseFormSetError, FieldValues } from 'react-hook-form';

import {
  InputFieldType,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  User,
} from '@/types';

type AuthHandler<T extends FieldValues> = (
  formData: T,
  setError: UseFormSetError<T>,
  inputs: InputFieldType<T>[],
) => Promise<void>;

type AuthHandlerFactory<T extends FieldValues> = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => AuthHandler<T>;

type SimpleMutation = (...args: any[]) => Promise<any>;

type NotificationSetter = Dispatch<SetStateAction<boolean>>;

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isVerified: boolean;
  isGoogleUser: boolean;

  handleRegister: AuthHandler<RegisterInput>;
  handleLogin: AuthHandler<LoginInput>;
  handleGoogleAuth: (options?: {
    onSuccess?: () => void;
    onError?: () => void;
  }) => SimpleMutation;
  handleLogout: SimpleMutation;

  handleVerifyEmail: (
    token: string,
    setSuccessNotificationOpen: NotificationSetter,
    setInvalidTokenNotificationOpen: NotificationSetter,
  ) => void;

  handleForgotPassword: AuthHandlerFactory<ForgotPasswordInput>;
  handleResetPassword: AuthHandlerFactory<ResetPasswordInput>;
};

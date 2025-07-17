import { Dispatch, SetStateAction } from 'react';

import { UseFormSetError } from 'react-hook-form';

import { AuthInputFieldType, LoginInput, RegisterInput } from '@/types';

export type AuthContextType = {
  user: any;
  isLoading: boolean;
  isVerified: boolean;
  handleRegister: (
    formData: RegisterInput,
    setError: UseFormSetError<RegisterInput>,
    inputs: AuthInputFieldType<RegisterInput>[],
  ) => void;
  handleLogin: (
    formData: LoginInput,
    setError: UseFormSetError<LoginInput>,
    inputs: AuthInputFieldType<LoginInput>[],
  ) => void;
  handleLogout: () => Promise<void>;
  handleVerifyEmail: (
    token: string,
    setSuccessNotificationOpen: Dispatch<SetStateAction<boolean>>,
    setInvalidTokenNotificationOpen: Dispatch<SetStateAction<boolean>>,
  ) => void;
};

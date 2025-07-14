import { UseFormSetError } from 'react-hook-form';

import { AuthInputFieldType, LoginInput, RegisterInput } from '@/types';

export type AuthContextType = {
  isLoading: boolean;
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
  handleLogout: () => void;
};

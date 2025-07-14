import { UseFormSetError } from 'react-hook-form';

import { AuthInputFieldType, RegisterInput } from '@/types';

export type AuthContextType = {
  handleRegister: (
    formData: RegisterInput,
    setError: UseFormSetError<RegisterInput>,
    inputs: AuthInputFieldType<RegisterInput>[],
  ) => void;
};

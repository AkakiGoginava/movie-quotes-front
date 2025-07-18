import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputFieldType, ForgotPasswordInput } from '@/types';
import { useAuth } from '@/hooks';

export const useForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    setError,
    reset,
  } = useForm<ForgotPasswordInput>({ mode: 'onChange' });

  const inputs: AuthInputFieldType<ForgotPasswordInput>[] = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      rules: {
        required: { value: true, message: 'Please enter your email' },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Enter a valid email address',
        },
      },
    },
  ];

  const { handleForgotPassword } = useAuth();

  const onSubmit: SubmitHandler<ForgotPasswordInput> = (data) =>
    handleForgotPassword(data, setError, inputs);

  return {
    register,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    touchedFields,
    getValues,
    reset,
    inputs,
  };
};

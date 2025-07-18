import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputFieldType, ForgotPasswordInput } from '@/types';
import { useAuth } from '@/hooks';
import { Dispatch, SetStateAction } from 'react';

export const useForgotPassword = (
  setForgotPasswordOpen: Dispatch<SetStateAction<boolean>>,
  setPasswordResetNotificationOpen: Dispatch<SetStateAction<boolean>>,
) => {
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

  const forgotPasswordWithOptions = handleForgotPassword({
    onSuccess: () => {
      setForgotPasswordOpen(false);
      setPasswordResetNotificationOpen(true);
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordInput> = (data) =>
    forgotPasswordWithOptions(data, setError, inputs);

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

import { SubmitHandler, useForm } from 'react-hook-form';

import { InputFieldType, ForgotPasswordInput } from '@/types';
import { useAuth } from '@/hooks';
import { Dispatch, SetStateAction } from 'react';

export const useForgotPassword = (
  setOpen: Dispatch<SetStateAction<boolean>>,
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

  const inputs: InputFieldType<ForgotPasswordInput>[] = [
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
      setOpen(false);
      setPasswordResetNotificationOpen(true);
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordInput> = (data) => {
    return forgotPasswordWithOptions(data, setError, inputs);
  };

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

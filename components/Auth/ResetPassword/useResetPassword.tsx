import { useEffect, Dispatch, SetStateAction } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthInputFieldType, ResetPasswordInput } from '@/types';
import { useAuth } from '@/hooks';

export const useResetPassword = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setResetSuccessNotificationOpen: Dispatch<SetStateAction<boolean>>,
  setInvalidTokenNotificationOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    setError,
    setValue,
    reset,
  } = useForm<ResetPasswordInput>({ mode: 'onChange' });

  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (email) {
      setValue('email', email);
    }

    if (token) {
      setValue('token', token);
    }
  }, [searchParams, setValue]);

  const inputs: AuthInputFieldType<ResetPasswordInput>[] = [
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'At least 8 & max.15 lower case characters',
      rules: {
        required: { value: true, message: 'Please enter your password' },
        minLength: { value: 8, message: 'Minimum length is 8' },
        maxLength: { value: 15, message: 'Maximum length is 15' },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: 'Only lowercase letters and numbers allowed',
        },
      },
    },
    {
      label: 'Password',
      name: 'password_confirmation',
      type: 'password',
      placeholder: 'Confirm password',
      rules: {
        required: { value: true, message: 'Please confirm your password' },
        validate: (value) =>
          value === getValues('password') || 'Passwords do not match',
      },
    },
  ];

  const { handleResetPassword } = useAuth();

  const resetPasswordWithOptions = handleResetPassword({
    onSuccess: () => {
      router.replace(window.location.pathname);

      setOpen(false);
      setResetSuccessNotificationOpen(true);
    },
    onError: () => {
      setOpen(false);
      setInvalidTokenNotificationOpen(true);
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = (data) => {
    resetPasswordWithOptions(data, setError, inputs);
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

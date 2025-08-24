import { useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';

import { InputFieldType, ResetPasswordInput } from '@/types';
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

  const { t } = require('react-i18next').useTranslation();
  const inputs: InputFieldType<ResetPasswordInput>[] = [
    {
      label: t('resetPassword.passwordLabel'),
      name: 'password',
      type: 'password',
      placeholder: t('resetPassword.passwordPlaceholder'),
      rules: {
        required: { value: true, message: t('resetPassword.passwordRequired') },
        minLength: { value: 8, message: t('resetPassword.passwordMinLength') },
        maxLength: { value: 15, message: t('resetPassword.passwordMaxLength') },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: t('resetPassword.passwordPattern'),
        },
      },
    },
    {
      label: t('resetPassword.confirmPasswordLabel'),
      name: 'password_confirmation',
      type: 'password',
      placeholder: t('resetPassword.confirmPasswordPlaceholder'),
      rules: {
        required: {
          value: true,
          message: t('resetPassword.confirmPasswordRequired'),
        },
        validate: (value: string) =>
          value === getValues('password') ||
          t('resetPassword.confirmPasswordMatch'),
      },
    },
  ];

  const { handleResetPasswordFactory } = useAuth();

  const handleResetPassword = handleResetPasswordFactory({
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

  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
    await handleResetPassword(data, setError, inputs);
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

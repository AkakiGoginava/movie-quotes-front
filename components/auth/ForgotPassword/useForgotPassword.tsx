import { Dispatch, SetStateAction } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputFieldType, ForgotPasswordInput } from '@/types';
import { useAuth } from '@/hooks';

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

  const { t } = useTranslation();
  const inputs: InputFieldType<ForgotPasswordInput>[] = [
    {
      label: t('forgotPassword.emailLabel'),
      name: 'email',
      type: 'email',
      placeholder: t('forgotPassword.emailPlaceholder'),
      rules: {
        required: { value: true, message: t('forgotPassword.emailRequired') },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: t('forgotPassword.emailInvalid'),
        },
      },
    },
  ];

  const { handleForgotPasswordFactory } = useAuth();

  const handleForgotPassword = handleForgotPasswordFactory({
    onSuccess: () => {
      setOpen(false);
      setPasswordResetNotificationOpen(true);
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
    await handleForgotPassword(data, setError, inputs);
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

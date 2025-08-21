import { SubmitHandler, useForm } from 'react-hook-form';

import { InputFieldType, RegisterInput } from '@/types';
import { useAuth } from '@/hooks';

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    reset,
    setError,
  } = useForm<RegisterInput>({
    mode: 'onChange',
  });

  const { t } = require('react-i18next').useTranslation();

  const inputs: InputFieldType<RegisterInput>[] = [
    {
      label: t('register.nameLabel'),
      name: 'name',
      type: 'text',
      placeholder: t('register.namePlaceholder'),
      rules: {
        required: { value: true, message: t('register.nameRequired') },
        minLength: { value: 3, message: t('register.nameMinLength') },
        maxLength: { value: 15, message: t('register.nameMaxLength') },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: t('register.namePattern'),
        },
      },
    },
    {
      label: t('register.emailLabel'),
      name: 'email',
      type: 'email',
      placeholder: t('register.emailPlaceholder'),
      rules: {
        required: { value: true, message: t('register.emailRequired') },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: t('register.emailInvalid'),
        },
      },
    },
    {
      label: t('register.passwordLabel'),
      name: 'password',
      type: 'password',
      placeholder: t('register.passwordPlaceholder'),
      rules: {
        required: { value: true, message: t('register.passwordRequired') },
        minLength: { value: 8, message: t('register.passwordMinLength') },
        maxLength: { value: 15, message: t('register.passwordMaxLength') },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: t('register.passwordPattern'),
        },
      },
    },
    {
      label: t('register.confirmPasswordLabel'),
      name: 'password_confirmation',
      type: 'password',
      placeholder: t('register.confirmPasswordPlaceholder'),
      rules: {
        required: {
          value: true,
          message: t('register.confirmPasswordRequired'),
        },
        validate: (value: string) =>
          value === getValues('password') || t('register.confirmPasswordMatch'),
      },
    },
  ];

  const { handleRegister } = useAuth();

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    handleRegister(data, setError, inputs);
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

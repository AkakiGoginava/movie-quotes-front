import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputFieldType, LoginInput } from '@/types';
import { useAuth } from '@/hooks';

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    setError,
    reset,
  } = useForm<LoginInput>({ mode: 'onChange' });

  const { t } = useTranslation();
  const inputs: InputFieldType<LoginInput>[] = [
    {
      label: t('login.emailLabel'),
      name: 'email',
      type: 'email',
      placeholder: t('login.emailPlaceholder'),
      rules: {
        required: { value: true, message: t('login.emailRequired') },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: t('login.emailInvalid'),
        },
      },
    },
    {
      label: t('login.passwordLabel'),
      name: 'password',
      type: 'password',
      placeholder: t('login.passwordPlaceholder'),
      rules: {
        required: { value: true, message: t('login.passwordRequired') },
      },
    },
    {
      label: t('login.rememberMe'),
      name: 'remember',
      type: 'checkbox',
    },
  ];

  const { handleLogin } = useAuth();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    handleLogin(data, setError, inputs);
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

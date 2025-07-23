import { SubmitHandler, useForm } from 'react-hook-form';

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

  const inputs: InputFieldType<LoginInput>[] = [
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
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      rules: {
        required: { value: true, message: 'Please enter your password' },
      },
    },
    {
      label: 'Remember me',
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

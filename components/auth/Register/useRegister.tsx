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

  const inputs: InputFieldType<RegisterInput>[] = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'At least 3 & max.15 lower case characters',
      rules: {
        required: { value: true, message: 'Please enter your name' },
        minLength: { value: 3, message: 'Minimum length is 3' },
        maxLength: { value: 15, message: 'Maximum length is 15' },
        pattern: {
          value: /^[a-z0-9]+$/,
          message: 'Only lowercase letters and numbers allowed',
        },
      },
    },
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

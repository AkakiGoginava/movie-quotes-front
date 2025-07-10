import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputFieldType } from '@/types';

import { LoginInput } from './types';

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginInput> = (data) => console.log(data);

  const inputs: AuthInputFieldType<LoginInput>[] = [
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

  return { register, handleSubmit, onSubmit, errors, touchedFields, inputs };
};

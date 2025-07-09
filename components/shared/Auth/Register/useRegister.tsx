import { useForm } from 'react-hook-form';

import { AuthInputType } from '@/types';

import { RegisterInput } from './types';

export const useRegister = () => {
  const { register, handleSubmit } = useForm<RegisterInput>();

  const inputs: AuthInputType[] = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'At least 3 & max.15 lower case characters',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'At least 3 & max.15 lower case characters',
    },
    {
      label: 'Password',
      name: 'password_confirmation',
      type: 'password',
      placeholder: 'Confirm password',
    },
  ];

  return { inputs };
};

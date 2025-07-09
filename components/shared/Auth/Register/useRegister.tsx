import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputFieldType } from '@/types';

import { RegisterInput } from './types';

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegisterInput> = (data) => console.log(data);

  const inputs: AuthInputFieldType<RegisterInput>[] = [
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

  return { register, handleSubmit, onSubmit, errors, inputs };
};

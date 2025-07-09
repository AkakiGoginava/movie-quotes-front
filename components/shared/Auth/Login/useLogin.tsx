import { AuthInputType } from '@/types';

export const useLogin = () => {
  const inputs: AuthInputType[] = [
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
      placeholder: 'Password',
    },
  ];

  return { inputs };
};

import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import { AuthInputFieldType } from '@/types';

const useAuthMutation = <FormValues extends FieldValues>(
  mutationFn: (data: FormValues) => Promise<AxiosResponse<{}>>,
  options = {},
) => {
  const mutation = useMutation({
    mutationFn,
    ...options,
  });

  return (
    formData: FormValues,
    setError: UseFormSetError<FormValues>,
    inputs: AuthInputFieldType<FormValues>[],
  ) => {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError;
        const data = axiosError?.response?.data as {
          errors: Record<string, string[]>;
        };

        inputs.forEach(({ name }) => {
          setError(name, {
            type: 'server',
            message: data?.errors[name][0] ?? 'error',
          });
        });
      },
    });
  };
};

export default useAuthMutation;

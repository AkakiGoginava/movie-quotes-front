import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import { InputFieldType } from '@/types';

const useAuthMutation = <FormValues extends FieldValues>(
  mutationFn: (data: FormValues) => Promise<AxiosResponse<{}>>,
  options?: {
    onSuccess?: (data: AxiosResponse<{}>) => void;
    onError?: (error: Error) => void;
  },
) => {
  const mutation = useMutation({ mutationFn });

  return async (
    formData: FormValues,
    setError?: UseFormSetError<FormValues>,
    inputs?: InputFieldType<FormValues>[],
  ) => {
    try {
      await mutation.mutateAsync(formData, {
        onSuccess: (data) => {
          if (options?.onSuccess) options.onSuccess(data);
        },
        onError: (error) => {
          inputs?.forEach(({ name, type: inputType }) => {
            if (
              axios.isAxiosError(error) &&
              inputType !== 'checkbox' &&
              error?.response?.data.errors[name]
            ) {
              setError?.(name, {
                type: 'server',
                message: error.response.data.errors[name][0] ?? 'error',
              });
            }
          });

          if (options?.onError) options.onError(error);
        },
      });
    } catch (error) {}
  };
};

export default useAuthMutation;

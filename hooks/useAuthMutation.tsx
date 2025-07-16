import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import { AuthInputFieldType } from '@/types';

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
    setError: UseFormSetError<FormValues>,
    inputs: AuthInputFieldType<FormValues>[],
  ) => {
    try {
      await mutation.mutateAsync(formData, {
        onSuccess: (data) => {
          if (options?.onSuccess) options.onSuccess(data);
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError;
          const data = axiosError?.response?.data as {
            errors: Record<string, string[]>;
          };

          inputs.forEach(({ name, type: inputType }) => {
            if (inputType !== 'checkbox' && data?.errors[name]) {
              setError(name, {
                type: 'server',
                message: data.errors[name][0] ?? 'error',
              });
            }
          });

          if (options?.onError) options.onError(error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default useAuthMutation;

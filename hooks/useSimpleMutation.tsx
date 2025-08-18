import { useMutation } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

const useSimpleMutation = <TData,>(
  mutationFn: (...args: any[]) => Promise<AxiosResponse<TData>>,
  options?: {
    onSuccess?: (data?: AxiosResponse<TData>, variables?: any[]) => void;
    onError?: (error: Error) => void;
  },
) => {
  const mutation = useMutation({
    mutationFn: (args: any[]) => mutationFn(...args),
    onSuccess: (data, variables) => options?.onSuccess?.(data, variables),
    onError: options?.onError,
  });

  return async (...args: any[]) => {
    try {
      return await mutation.mutateAsync(args);
    } catch (error) {
      throw error;
    }
  };
};

export default useSimpleMutation;

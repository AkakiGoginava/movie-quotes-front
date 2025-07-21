import { useMutation } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

const useSimpleMutation = (
  mutationFn: (...args: any[]) => Promise<AxiosResponse<{}>>,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  },
) => {
  const mutation = useMutation({
    mutationFn: (args: any[]) => mutationFn(...args),
    onSuccess: options?.onSuccess,
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

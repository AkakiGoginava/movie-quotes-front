import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

const useLogoutMutation = (
  mutationFn: () => Promise<AxiosResponse<{}>>,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  },
) => {
  const mutation = useMutation({ mutationFn });

  return () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        if (options?.onSuccess) options.onSuccess();
      },
      onError: (error: Error) => {
        if (options?.onError) options.onError(error);
      },
    });
  };
};

export default useLogoutMutation;

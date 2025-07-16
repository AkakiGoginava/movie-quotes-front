import { useMutation } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

const useLogoutMutation = (
  mutationFn: () => Promise<AxiosResponse<{}>>,
  options?: {
    onSuccess?: () => void;
  },
) => {
  const mutation = useMutation({ mutationFn });

  return async () => {
    try {
      await mutation.mutateAsync(undefined, {
        onSuccess: () => {
          if (options?.onSuccess) options.onSuccess();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default useLogoutMutation;

import { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';

const useVerifyEmailMutation = (
  mutationFn: (token: string) => Promise<AxiosResponse<{}>>,
  options?: {
    onSuccess?: () => void;
  },
) => {
  const router = useRouter();
  const verifyEmailMutation = useMutation({
    mutationFn,
  });

  return (
    token: string,
    setSuccessNotificationOpen: Dispatch<SetStateAction<boolean>>,
    setInvalidTokenNotificationOpen: Dispatch<SetStateAction<boolean>>,
  ) => {
    verifyEmailMutation.mutate(token, {
      onSuccess: () => {
        router.replace(window.location.pathname);

        setSuccessNotificationOpen(true);

        if (options?.onSuccess) options.onSuccess();
      },
      onError: () => {
        setInvalidTokenNotificationOpen(true);
      },
    });
  };
};

export default useVerifyEmailMutation;

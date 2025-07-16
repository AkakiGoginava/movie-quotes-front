import { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@tanstack/react-query';

import { verifyEmail } from '@/services';
import { useRouter } from 'next/navigation';

const useVerifyEmail = (
  setSuccessNotificationOpen: Dispatch<SetStateAction<boolean>>,
  setInvalidTokenNotificationOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const router = useRouter();

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      setTimeout(() => {
        router.replace(window.location.pathname);
      }, 200);

      setSuccessNotificationOpen(true);
    },
    onError: () => {
      setInvalidTokenNotificationOpen(true);
    },
  });

  return (token: string) => {
    verifyEmailMutation.mutate(token);
  };
};

export default useVerifyEmail;

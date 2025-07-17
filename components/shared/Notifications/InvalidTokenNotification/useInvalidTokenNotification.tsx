import { Dispatch, SetStateAction } from 'react';

import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { requestVerificationEmail } from '@/services';

export const useInvalidTokenNotification = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setVerifyEmailNotificationOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const requestVerificationEmailMutation = useMutation({
    mutationFn: requestVerificationEmail,
    onSuccess: (data) => {
      console.log('Request successful', data);

      setOpen(false);
      setVerifyEmailNotificationOpen(true);
    },
    onError: (error: any) => {
      console.log('Request failed', error);
      alert(error?.response?.data?.message);
    },
  });

  const handleRequestEmail = () => {
    requestVerificationEmailMutation.mutate(email);
  };

  return {
    handleRequestEmail,
    isLoading: requestVerificationEmailMutation.isPending,
  };
};

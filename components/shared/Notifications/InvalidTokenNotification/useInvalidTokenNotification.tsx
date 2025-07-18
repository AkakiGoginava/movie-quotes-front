import { Dispatch, SetStateAction } from 'react';

import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { requestNewLink } from '@/services';

export const useInvalidTokenNotification = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setVerifyEmailNotificationOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const action = searchParams.get('action') ?? '';

  const requestNewLinkMutation = useMutation({
    mutationFn: ({ action, email }: { action: string; email: string }) =>
      requestNewLink(action, email),
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

  const handleRequestNewLink = () => {
    if (!action || !email) {
      console.warn('Action or email not available');
      return;
    }
    requestNewLinkMutation.mutate({ action, email });
  };

  return {
    handleRequestNewLink,
    isLoading: requestNewLinkMutation.isPending,
    action,
  };
};

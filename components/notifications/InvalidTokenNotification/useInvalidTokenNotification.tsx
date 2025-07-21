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
      setOpen(false);
      setVerifyEmailNotificationOpen(true);
    },
  });

  const handleRequestNewLink = () => {
    if (!action || !email) {
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

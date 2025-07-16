import { requestVerificationEmail } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useInvalidTokenNotification = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const requestVerificationEmailMutation = useMutation({
    mutationFn: requestVerificationEmail,
    onSuccess: (data) => {
      console.log('Request successful', data);
    },
    onError: (error) => {
      console.log('Request failed', error);
    },
  });

  const requestEmail = () => requestVerificationEmailMutation.mutate(email);

  return { requestEmail };
};

import { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@tanstack/react-query';

import { checkEmailToken } from '@/services';

const useCheckEmailTokenMutation = (
  setInvalidTokenNotificationOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const checkEmailTokenMutation = useMutation({
    mutationFn: checkEmailToken,
    onError: () => setInvalidTokenNotificationOpen(true),
  });

  return (token: string) => checkEmailTokenMutation.mutate(token);
};

export default useCheckEmailTokenMutation;

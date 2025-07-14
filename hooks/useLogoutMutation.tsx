import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

const useLogoutMutation = (mutationFn: () => Promise<AxiosResponse<{}>>) => {
  const mutation = useMutation({ mutationFn });
  const queryClient = useQueryClient();

  return () => {
    mutation.mutate(undefined, {
      onSuccess: (data: AxiosResponse<{}>) => {
        console.log('Logout successful: ', data);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
      onError: (error: Error) => {
        console.log('Error logging out');
        throw error;
      },
    });
  };
};

export default useLogoutMutation;

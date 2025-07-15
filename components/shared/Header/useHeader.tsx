import { useState } from 'react';

import { useAuth } from '@/hooks';

export const useHeader = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  const { user, isLoading, handleLogout } = useAuth();

  return { loginOpen, setLoginOpen, user, isLoading, handleLogout };
};

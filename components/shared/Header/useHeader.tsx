import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useAuth } from '@/hooks';

export const useHeader = () => {
  const { user, isLoading, handleLogout, isVerified } = useAuth();

  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingLogout, setPendingLogout] = useState(false);
  const [VerifyEmailNotificationOpen, setVerifyEmailNotificationOpen] =
    useState(false);

  const searchParams = useSearchParams();

  const action = searchParams.get('action');
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    setVerifyEmailNotificationOpen(
      !!user && !isVerified && action !== 'verify',
    );

    if (action === 'verify' && !(user && isVerified)) {
      if (user && !pendingLogout) {
        handleLogout();
        setPendingLogout(true);
      }
    }
  }, [pendingLogout, user, isVerified, action, token, email]);

  useEffect(() => {
    if (!user && pendingLogout) {
      setPendingLogout(false);
    }
    console.log(pendingLogout);
  }, [user, pendingLogout]);

  return {
    loginOpen,
    setLoginOpen,
    VerifyEmailNotificationOpen,
    setVerifyEmailNotificationOpen,
    user: pendingLogout ? null : user,
    isLoading,
    handleLogout,
  };
};

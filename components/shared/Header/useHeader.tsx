import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useAuth } from '@/hooks';

import { useCheckEmailTokenMutation } from './hooks';

export const useHeader = () => {
  const { user, isLoading, handleLogout, isVerified } = useAuth();

  const [loginOpen, setLoginOpen] = useState(false);
  const [VerifyEmailNotificationOpen, setVerifyEmailNotificationOpen] =
    useState(false);
  const [invalidTokenNotificationOpen, setInvalidTokenNotificationOpen] =
    useState(false);
  const [pendingLogout, setPendingLogout] = useState(false);

  const searchParams = useSearchParams();

  const action = searchParams.get('action');
  const token = searchParams.get('token') ?? '';

  const checkEmailToken = useCheckEmailTokenMutation(
    setInvalidTokenNotificationOpen,
  );

  useEffect(() => {
    setVerifyEmailNotificationOpen(
      !!user && !isVerified && action !== 'verify',
    );

    if (action === 'verify' && !(user && isVerified)) {
      if (user && !pendingLogout) {
        handleLogout();
        setPendingLogout(true);
      }

      checkEmailToken(token);
    }
  }, [pendingLogout, user, isVerified, action, token]);

  useEffect(() => {
    if (!user && pendingLogout) {
      setPendingLogout(false);
    }
  }, [user, pendingLogout]);

  return {
    loginOpen,
    setLoginOpen,
    VerifyEmailNotificationOpen,
    setVerifyEmailNotificationOpen,
    invalidTokenNotificationOpen,
    setInvalidTokenNotificationOpen,
    user: pendingLogout ? null : user,
    isLoading,
    handleLogout,
  };
};

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useAuth } from '@/hooks';

import { useVerifyEmail } from './hooks';

export const useHeader = () => {
  const { user, isLoading, handleLogout, isVerified } = useAuth();

  const [loginOpen, setLoginOpen] = useState(false);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);
  const [verifyEmailNotificationOpen, setVerifyEmailNotificationOpen] =
    useState(false);

  const [invalidTokenNotificationOpen, setInvalidTokenNotificationOpen] =
    useState(false);

  const [pendingLogout, setPendingLogout] = useState(false);
  const [verificationStarted, setVerificationStarted] = useState(false);

  const searchParams = useSearchParams();

  const action = searchParams.get('action');
  const token = searchParams.get('token') ?? '';

  const verifyEmail = useVerifyEmail(
    setSuccessNotificationOpen,
    setInvalidTokenNotificationOpen,
  );

  useEffect(() => {
    setVerifyEmailNotificationOpen(
      !!user && !isVerified && action !== 'verify',
    );
    console.log(isLoading, action, user, isVerified, verificationStarted);

    if (
      !isLoading &&
      action === 'verify' &&
      !(user && isVerified) &&
      !verificationStarted
    ) {
      if (user && !pendingLogout) {
        handleLogout();
        setPendingLogout(true);
      } else if (!user) {
        setVerificationStarted(true);
        verifyEmail(token);
      }
    }
  }, [pendingLogout, user, isVerified, isLoading, action, token]);

  useEffect(() => {
    if (!user && pendingLogout) {
      setPendingLogout(false);
    }
  }, [user, pendingLogout]);

  return {
    loginOpen,
    setLoginOpen,
    verifyEmailNotificationOpen,
    setVerifyEmailNotificationOpen,
    invalidTokenNotificationOpen,
    setInvalidTokenNotificationOpen,
    successNotificationOpen,
    setSuccessNotificationOpen,
    user: pendingLogout ? null : user,
    isLoading,
    handleLogout,
  };
};

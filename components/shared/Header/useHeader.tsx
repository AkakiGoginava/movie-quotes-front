import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useAuth } from '@/hooks';

export const useHeader = () => {
  const { user, isLoading, handleLogout, isVerified, handleVerifyEmail } =
    useAuth();

  const [verificationStarted, setVerificationStarted] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);

  const [verifyEmailNotificationOpen, setVerifyEmailNotificationOpen] =
    useState(false);

  const [invalidTokenNotificationOpen, setInvalidTokenNotificationOpen] =
    useState(false);

  const searchParams = useSearchParams();

  const action = searchParams.get('action');
  const token = searchParams.get('token') ?? '';

  useEffect(() => {
    setVerifyEmailNotificationOpen(
      !!user && !isVerified && action !== 'verify',
    );

    if (
      !isLoading &&
      action === 'verify' &&
      !(user && isVerified) &&
      !verificationStarted
    ) {
      setVerificationStarted(true);
      handleVerifyEmail(
        token,
        setSuccessNotificationOpen,
        setInvalidTokenNotificationOpen,
      );
    }
  }, [user, isVerified, isLoading, action, token]);

  return {
    loginOpen,
    setLoginOpen,
    verifyEmailNotificationOpen,
    setVerifyEmailNotificationOpen,
    invalidTokenNotificationOpen,
    setInvalidTokenNotificationOpen,
    successNotificationOpen,
    setSuccessNotificationOpen,
    user,
    isLoading,
    handleLogout,
  };
};

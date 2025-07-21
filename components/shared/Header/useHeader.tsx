import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useAuth } from '@/hooks';

export const useHeader = (
  setRegisterOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const {
    user,
    isLoading,
    handleLogout,
    isVerified,
    handleVerifyEmail,
    handleGoogleAuth,
  } = useAuth();

  const searchParams = useSearchParams();

  const action = searchParams.get('action');
  const token = searchParams.get('token') ?? '';
  const googleAuthCode = searchParams.get('code');

  const [verificationStarted, setVerificationStarted] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);

  const [verifyEmailNotificationOpen, setVerifyEmailNotificationOpen] =
    useState(false);

  const [passwordResetNotificationOpen, setPasswordResetNotificationOpen] =
    useState(false);

  const [invalidTokenNotificationOpen, setInvalidTokenNotificationOpen] =
    useState(false);

  const handleGoogleAuthWithOptions = handleGoogleAuth({
    onSuccess: () => {
      setLoginOpen(false);
      setRegisterOpen(false);
    },
  });

  useEffect(() => {
    setVerifyEmailNotificationOpen(
      !!user && !isVerified && action !== 'verify',
    );

    if (action === 'verify' && !(user && isVerified) && !verificationStarted) {
      setVerificationStarted(true);
      handleVerifyEmail(
        token,
        setSuccessNotificationOpen,
        setInvalidTokenNotificationOpen,
      );
    } else if (action === 'reset-password' && !user) {
      setResetPasswordOpen(true);
    } else if (googleAuthCode) {
      handleGoogleAuthWithOptions(googleAuthCode);
    }
  }, [user, isVerified, action, token, googleAuthCode]);

  const handleForgotPasswordClick = () => {
    setLoginOpen(false);
    setForgotPasswordOpen(true);
  };

  return {
    loginOpen,
    setLoginOpen,
    forgotPasswordOpen,
    setForgotPasswordOpen,
    resetPasswordOpen,
    setResetPasswordOpen,
    handleForgotPasswordClick,
    verifyEmailNotificationOpen,
    setVerifyEmailNotificationOpen,
    passwordResetNotificationOpen,
    setPasswordResetNotificationOpen,
    invalidTokenNotificationOpen,
    setInvalidTokenNotificationOpen,
    successNotificationOpen,
    setSuccessNotificationOpen,
    user,
    isLoading,
    handleLogout,
  };
};

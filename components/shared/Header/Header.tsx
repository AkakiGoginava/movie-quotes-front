import { useTranslation } from 'react-i18next';

import {
  Login,
  Register,
  LanguageDropdown,
  Button,
  EmailSentNotification,
  InvalidTokenNotification,
  SuccessNotification,
  ForgotPassword,
  ResetPassword,
  MenuIcon,
  Search,
  NotificationBell,
} from '@/components';
import { cn } from '@/helpers';

import { useHeader } from './useHeader';
import { PropsType } from './types';

const Header: React.FC<PropsType> = ({
  registerOpen,
  setRegisterOpen,
  setSidebarOpen,
  setActiveSearch,
}) => {
  const {
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
    currentPath,
  } = useHeader(setRegisterOpen);

  const { t } = useTranslation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <header
      className={cn(
        'fixed z-20 w-full flex gap-2 items-center px-8 md:px-17.5 py-7 bg-obsidian',
        {
          'bg-transparent': currentPath === '/',
        },
      )}
    >
      <h3 className='font-medium text-light-yellow hidden md:inline-block mr-auto'>
        MOVIE QUOTES
      </h3>

      {user && (
        <>
          <MenuIcon
            className='md:hidden mr-auto'
            onClick={() => {
              setSidebarOpen?.(true);
            }}
          />

          {setActiveSearch && (
            <Search
              onSearch={(searchTerm: string) => {
                setActiveSearch(searchTerm);
              }}
              className='md:hidden mr-2'
            />
          )}
          <NotificationBell />
        </>
      )}

      <div className={cn('ml-auto', { 'ml-0': user })}>
        <LanguageDropdown />
      </div>

      {user ? (
        <>
          <Button
            type='button'
            variant='secondary'
            handleClick={() => {
              setLoginOpen(false);
              setRegisterOpen?.(false);
              handleLogout();
            }}
            className='text-sm h-8 hidden md:block'
          >
            {t('logout')}
          </Button>
        </>
      ) : (
        <>
          {registerOpen !== undefined && setRegisterOpen && (
            <>
              <Register
                registerOpen={registerOpen}
                setRegisterOpen={setRegisterOpen}
                setLoginOpen={setLoginOpen}
              />

              <Login
                loginOpen={loginOpen}
                setLoginOpen={setLoginOpen}
                setRegisterOpen={setRegisterOpen}
                handleForgotPasswordClick={handleForgotPasswordClick}
              />
            </>
          )}

          <ForgotPassword
            open={forgotPasswordOpen}
            setOpen={setForgotPasswordOpen}
            setLoginOpen={setLoginOpen}
            setPasswordResetNotificationOpen={setPasswordResetNotificationOpen}
          />

          <ResetPassword
            open={resetPasswordOpen}
            setOpen={setResetPasswordOpen}
            setLoginOpen={setLoginOpen}
            setResetSuccessNotificationOpen={setSuccessNotificationOpen}
            setInvalidTokenNotificationOpen={setInvalidTokenNotificationOpen}
          />
        </>
      )}

      <EmailSentNotification
        open={verifyEmailNotificationOpen}
        setOpen={setVerifyEmailNotificationOpen}
        title={t('notifications.emailSentTitle')}
        text={t('notifications.emailSentText')}
      />

      <EmailSentNotification
        open={passwordResetNotificationOpen}
        setOpen={setPasswordResetNotificationOpen}
        title={t('notifications.passwordResetTitle')}
        text={t('notifications.passwordResetText')}
        hasExit
      />

      <InvalidTokenNotification
        open={invalidTokenNotificationOpen}
        setOpen={setInvalidTokenNotificationOpen}
        setVerifyEmailNotificationOpen={setVerifyEmailNotificationOpen}
      />

      <SuccessNotification
        open={successNotificationOpen}
        setOpen={setSuccessNotificationOpen}
        setLoginOpen={setLoginOpen}
      />
    </header>
  );
};

export default Header;

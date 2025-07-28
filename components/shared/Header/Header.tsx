import {
  Login,
  Register,
  Dropdown,
  Button,
  EmailSentNotification,
  InvalidTokenNotification,
  SuccessNotification,
  ForgotPassword,
  ResetPassword,
  MenuIcon,
  SearchIcon,
  BellIcon,
} from '@/components';

import { useHeader } from './useHeader';
import { PropsType } from './types';
import { cn } from '@/helpers';

const Header: React.FC<PropsType> = ({
  registerOpen,
  setRegisterOpen,
  setSidebarOpen,
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
      <h3 className='font-medium text-light-yellow hidden md:inline-block'>
        MOVIE QUOTES
      </h3>

      <MenuIcon
        className='md:hidden mr-auto'
        onClick={() => {
          setSidebarOpen?.(true);
        }}
      />

      <SearchIcon className='md:hidden mr-2' />

      <BellIcon />

      <Dropdown options={['Eng', 'Geo']} selected={0} />

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
            className='text-sm h-8'
          >
            Log out
          </Button>
        </>
      ) : (
        <>
          {registerOpen !== undefined && setRegisterOpen && (
            <>
              <Login
                loginOpen={loginOpen}
                setLoginOpen={setLoginOpen}
                setRegisterOpen={setRegisterOpen}
                handleForgotPasswordClick={handleForgotPasswordClick}
              />

              <Register
                registerOpen={registerOpen}
                setRegisterOpen={setRegisterOpen}
                setLoginOpen={setLoginOpen}
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
        title='Thank you!'
        text='Please check your email and follow the instructions to activate your account.'
      />

      <EmailSentNotification
        open={passwordResetNotificationOpen}
        setOpen={setPasswordResetNotificationOpen}
        title='Check you email'
        text='We have sent a password recover instructions to your email'
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

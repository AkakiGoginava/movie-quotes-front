import {
  Login,
  Register,
  Dropdown,
  Button,
  EmailSentNotification,
  InvalidTokenNotification,
  SuccessNotification,
  ForgotPassword,
} from '@/components';

import { useHeader } from './useHeader';
import { PropsType } from './types';

const Header: React.FC<PropsType> = ({ registerOpen, setRegisterOpen }) => {
  const {
    loginOpen,
    setLoginOpen,
    ForgotPasswordOpen,
    setForgotPasswordOpen,
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
  } = useHeader();

  if (isLoading) return <div>Loading...</div>;

  return (
    <header className='fixed z-20 w-full flex gap-2 items-center px-4 md:px-17.5 py-7 bg-transparent'>
      <h3 className='font-medium text-light-yellow'>MOVIE QUOTES</h3>

      <Dropdown options={['Eng', 'Geo']} selected={0} />

      {user ? (
        <Button
          type='button'
          variant='secondary'
          handleClick={() => {
            setLoginOpen(false);
            setRegisterOpen(false);
            handleLogout();
          }}
          className='text-sm h-8'
        >
          Log out
        </Button>
      ) : (
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

          <ForgotPassword
            forgotPasswordOpen={ForgotPasswordOpen}
            setForgotPasswordOpen={setForgotPasswordOpen}
            setLoginOpen={setLoginOpen}
            setPasswordResetNotificationOpen={setPasswordResetNotificationOpen}
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

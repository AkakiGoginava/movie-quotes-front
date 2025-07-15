import {
  Login,
  Register,
  Dropdown,
  Button,
  VerifyEmailNotification,
} from '@/components';

import { useHeader } from './useHeader';
import { PropsType } from './types';

const Header: React.FC<PropsType> = ({ registerOpen, setRegisterOpen }) => {
  const { loginOpen, setLoginOpen, user, isLoading, handleLogout } =
    useHeader();

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
          />

          <Register
            registerOpen={registerOpen}
            setLoginOpen={setLoginOpen}
            setRegisterOpen={setRegisterOpen}
          />
        </>
      )}

      <VerifyEmailNotification />
    </header>
  );
};

export default Header;

import { Login, Register, Dropdown } from '@/components';

import { useHeader } from './useHeader';
import { PropsType } from './types';

const Header: React.FC<PropsType> = ({ registerOpen, setRegisterOpen }) => {
  const { loginOpen, setLoginOpen } = useHeader();

  return (
    <header className='fixed z-20 w-full flex gap-2 items-center px-4 md:px-17.5 py-7 bg-transparent'>
      <h3 className='font-medium text-light-yellow'>MOVIE QUOTES</h3>

      <Dropdown options={['Eng', 'Geo']} selected={0} />

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
    </header>
  );
};

export default Header;

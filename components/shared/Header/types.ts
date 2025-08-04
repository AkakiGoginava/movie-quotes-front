import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  registerOpen?: boolean;
  setRegisterOpen?: Dispatch<SetStateAction<boolean>>;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  setActiveSearch?: Dispatch<SetStateAction<string>>;
};

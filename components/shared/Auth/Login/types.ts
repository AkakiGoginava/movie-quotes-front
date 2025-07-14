import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  loginOpen: boolean;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
  setRegisterOpen: Dispatch<SetStateAction<boolean>>;
};

import { Dispatch, SetStateAction } from 'react';

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type PropsType = {
  loginOpen: boolean;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
  setRegisterOpen: Dispatch<SetStateAction<boolean>>;
};

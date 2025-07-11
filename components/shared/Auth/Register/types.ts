import { Dispatch, SetStateAction } from 'react';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type PropsType = {
  registerOpen: boolean;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
  setRegisterOpen: Dispatch<SetStateAction<boolean>>;
};

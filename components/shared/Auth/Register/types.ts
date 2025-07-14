import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  registerOpen: boolean;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
  setRegisterOpen: Dispatch<SetStateAction<boolean>>;
};

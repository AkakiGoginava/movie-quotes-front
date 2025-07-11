import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  registerOpen: boolean;
  setRegisterOpen: Dispatch<SetStateAction<boolean>>;
};

import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  forgotPasswordOpen: boolean;
  setForgotPasswordOpen: Dispatch<SetStateAction<boolean>>;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
};

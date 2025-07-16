import { Dispatch, ReactNode, SetStateAction } from 'react';

export type PropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
  btnText: string;
  icon: ReactNode;
  handleClick: () => void;
};

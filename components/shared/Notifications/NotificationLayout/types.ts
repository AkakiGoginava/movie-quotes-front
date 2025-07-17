import { Dispatch, ReactNode, SetStateAction } from 'react';

type BaseProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
  icon: ReactNode;
  hasExit?: boolean;
  children?: ReactNode;
};

type WithButton = {
  hasBtn: true;
  btnText: string;
  handleClick: () => void;
};

type WithoutButton = {
  hasBtn?: false;
  btnText?: never;
  handleClick?: never;
};

export type PropsType = BaseProps & (WithButton | WithoutButton);

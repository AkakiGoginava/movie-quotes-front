import { Dispatch, JSX, SetStateAction } from 'react';

import { FieldValues, UseFormReset } from 'react-hook-form';

type ModalType<FormValues extends FieldValues = FieldValues> = {
  modalClassName?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hasExit?: boolean;
  reset?: UseFormReset<FormValues>;
  children: JSX.Element;
};

type WithButton = {
  hasButton: boolean;
  buttonClassName?: string;
  buttonVariant: 'primary' | 'secondary';
  buttonText: string;
};

type WithoutButton = {
  hasButton?: false;
  buttonClassName?: never;
  buttonVariant?: never;
  buttonText?: never;
};

export type PropsType<FormValues extends FieldValues = FieldValues> =
  ModalType<FormValues> & (WithButton | WithoutButton);

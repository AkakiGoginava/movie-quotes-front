import { Dispatch, JSX, SetStateAction } from 'react';

import { FieldValues, UseFormReset } from 'react-hook-form';

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  className?: string;
  buttonVariant?: 'primary' | 'secondary';
  buttonText: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  reset: UseFormReset<FormValues>;
  children: JSX.Element;
};

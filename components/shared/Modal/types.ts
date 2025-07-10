import { JSX } from 'react';
import { FieldValues, UseFormReset } from 'react-hook-form';

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  className?: string;
  buttonText: string;
  id: string;
  reset: UseFormReset<FormValues>;
  children: JSX.Element;
};

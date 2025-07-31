import { Control, FieldValues } from 'react-hook-form';

import { InputFieldType } from '@/types';

export type OptionType = {
  id: number;
  name: string;
};

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  input: InputFieldType<FormValues>;
  control: Control<FormValues>;
  hasEnteredInput: boolean;
  isInvalid: boolean;
  isValid: boolean;
};

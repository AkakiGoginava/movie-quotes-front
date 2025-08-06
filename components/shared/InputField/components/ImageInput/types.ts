import { Control, FieldValues } from 'react-hook-form';

import { InputFieldType } from '@/types';

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  input: InputFieldType<FormValues>;
  control: Control<FormValues>;
  hasEnteredInput: boolean;
  isInvalid: boolean;
  isValid: boolean;
};

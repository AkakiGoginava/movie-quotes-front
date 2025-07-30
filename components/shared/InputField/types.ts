import {
  Control,
  FieldErrors,
  FieldNamesMarkedBoolean,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

import { InputFieldType } from '@/types';

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  input: InputFieldType<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  touchedFields: FieldNamesMarkedBoolean<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  handleForgotPasswordClick?: () => void;
  showError?: boolean;
  className?: string;
  type: 'auth' | 'movie';
  control?: Control<FormValues>;
};

export type UseInputFieldProps<FormValues extends FieldValues = FieldValues> = {
  input: InputFieldType<FormValues>;
  errors: FieldErrors<FormValues>;
  touchedFields: FieldNamesMarkedBoolean<FormValues>;
  getValues: UseFormGetValues<FormValues>;
};

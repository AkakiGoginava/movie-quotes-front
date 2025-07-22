import {
  FieldErrors,
  FieldNamesMarkedBoolean,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

import { AuthInputFieldType } from '@/types';

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  input: AuthInputFieldType<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  touchedFields: FieldNamesMarkedBoolean<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  handleForgotPasswordClick?: () => void;
  showError?: boolean;
};

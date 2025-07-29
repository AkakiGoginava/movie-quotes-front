import {
  FieldErrors,
  FieldNamesMarkedBoolean,
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

import { InputFieldType } from '@/types';

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  title: string;
  submitText: string;
  inputs: InputFieldType<FormValues>[];
  register: UseFormRegister<FormValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  errors: FieldErrors<FormValues>;
  touchedFields: FieldNamesMarkedBoolean<FormValues>;
  getValues: UseFormGetValues<FormValues>;
};

import {
  Control,
  FieldErrors,
  FieldNamesMarkedBoolean,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

import { InputFieldType, Movie } from '@/types';

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
  control: Control<FormValues>;
  movie?: Movie;
};

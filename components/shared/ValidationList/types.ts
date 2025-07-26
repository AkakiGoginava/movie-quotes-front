import { InputFieldType } from '@/types';
import {
  FieldErrors,
  FieldNamesMarkedBoolean,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  name: string;
  editInputs: InputFieldType<FormValues>[];
  register: UseFormRegister<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  errors: FieldErrors<FormValues>;
  touchedFields: FieldNamesMarkedBoolean<FormValues>;
};

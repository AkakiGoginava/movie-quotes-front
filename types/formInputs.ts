import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export type AuthInputFieldType<FormValues extends FieldValues = FieldValues> = {
  name: Path<FormValues>;
  type: string;
  placeholder?: string;
  label: string;
  rules?: RegisterOptions<FormValues, Path<FormValues>>;
};

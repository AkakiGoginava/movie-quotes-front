import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export type InputFieldType<FormValues extends FieldValues = FieldValues> = {
  name: Path<FormValues>;
  type: string;
  placeholder?: string;
  label: string;
  rules?: RegisterOptions<FormValues, Path<FormValues>>;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ResetPasswordInput = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

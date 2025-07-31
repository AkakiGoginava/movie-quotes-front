import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export type InputFieldType<FormValues extends FieldValues = FieldValues> = {
  name: Path<FormValues>;
  type: string;
  options?: any[];
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

export type UsernameEditInput = {
  name: string;
};

export type PasswordEditInput = {
  password: string;
  password_confirmation: string;
};

export type AvatarEditInput = {
  image?: FileList;
};

export type ProfileEditInput = UsernameEditInput &
  PasswordEditInput &
  AvatarEditInput;

export type MovieInputsType = {
  name: {
    en: string;
    ka: string;
  };
  categories: number[];
  year: string;
  director: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  image: FileList;
};

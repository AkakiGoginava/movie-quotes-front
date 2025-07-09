import { JSX } from 'react';

import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { AuthInputFieldType } from '@/types';

export type PropsType<FormValues extends FieldValues> = {
  title: string;
  subTitle: string;
  submitText: string;
  inputs: AuthInputFieldType<FormValues>[];
  hasGoogleAuth?: boolean;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues, FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  errors: FieldErrors<FormValues>;
  children?: JSX.Element;
};

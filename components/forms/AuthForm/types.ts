import { JSX } from 'react';

import {
  FieldErrors,
  FieldNamesMarkedBoolean,
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { InputFieldType } from '@/types';

export type PropsType<FormValues extends FieldValues = FieldValues> = {
  title: string;
  subTitle: string;
  submitText: string;
  inputs: InputFieldType<FormValues>[];
  hasGoogleSignUp?: boolean;
  hasGoogleSignIn?: boolean;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues, FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
  errors: FieldErrors<FormValues>;
  touchedFields: FieldNamesMarkedBoolean<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  handleForgotPasswordClick?: () => void;
  children?: JSX.Element;
};

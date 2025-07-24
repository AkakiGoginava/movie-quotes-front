import { Dispatch, SetStateAction } from 'react';

import {
  FieldErrors,
  FieldNamesMarkedBoolean,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';

import { InputFieldType } from '@/types';

type Props = {
  name: string;
  info: {
    label: string;
    value: string | undefined;
    type: string;
  };
};

type Editable<FormValues extends FieldValues = FieldValues> = {
  editable: true;
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  editInputs: InputFieldType<FormValues>[];
  register: UseFormRegister<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  errors: FieldErrors<FormValues>;
  touchedFields: FieldNamesMarkedBoolean<FormValues>;
};

type NonEditable = {
  editable?: false;
  editing?: never;
  setEditing?: never;
  editInputs?: never;
  register?: never;
  getValues?: never;
  errors?: never;
  touchedFields?: never;
};

export type PropsType<FormValues extends FieldValues = FieldValues> = Props &
  (Editable<FormValues> | NonEditable);

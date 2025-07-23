import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  info: {
    label: string;
    value: string | undefined;
    type: string;
  };
};

type Editable = {
  editable: true;
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  editInputs: {};
  register: UseFormRegister<FieldValues>;
};

type NonEditable = {
  editable?: false;
  editing?: never;
  setEditing?: never;
  editInputs?: never;
  register?: never;
};

export type PropsType = Props & (Editable | NonEditable);

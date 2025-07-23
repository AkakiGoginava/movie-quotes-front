import { Dispatch, SetStateAction } from 'react';

type Props = {
  info: {
    label: string;
    value: string | undefined;
    type: string;
  };
};

type Editable = {
  editable: true;
  editFields: {};
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  editInputs: {};
};

type NonEditable = {
  editable?: false;
  editFields?: {};
  editing?: false;
  setEditing?: never;
  editInputs?: {};
};

export type PropsType = Props & (Editable | NonEditable);

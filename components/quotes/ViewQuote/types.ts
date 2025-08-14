import { Quote } from '@/types';
import { Dispatch, SetStateAction } from 'react';

type BaseProps = {
  quote: Quote;
};

type EditableProps = {
  readonly?: false;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setOpenQuoteEdit: Dispatch<SetStateAction<boolean>>;
  handleDeleteQuote: (...args: any[]) => Promise<any>;
};

type ReadOnlyProps = {
  readonly: true;
};

export type PropsType = BaseProps & (EditableProps | ReadOnlyProps);

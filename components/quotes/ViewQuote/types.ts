import { Quote } from '@/types';
import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  quote: Quote;
  readonly?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
  setOpenQuoteEdit?: Dispatch<SetStateAction<boolean>>;
  handleDeleteQuote?: (...args: any[]) => Promise<any>;
};

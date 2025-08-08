import { SimpleQuote } from '@/types';
import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  quote: SimpleQuote;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setOpenQuoteEdit: Dispatch<SetStateAction<boolean>>;
  handleDeleteQuote: (...args: any[]) => Promise<any>;
};

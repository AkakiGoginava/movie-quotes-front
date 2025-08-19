import { Dispatch, SetStateAction } from 'react';

import { AppNotification } from '@/types';

export type PropsType = {
  notification: AppNotification;
  setOpenQuoteEdit: Dispatch<SetStateAction<boolean>>;
  openQuoteEdit: boolean;
  setOpenQuoteView: Dispatch<SetStateAction<boolean>>;
  openQuoteView: boolean;
};

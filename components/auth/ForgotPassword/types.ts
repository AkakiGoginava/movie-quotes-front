import { Dispatch, SetStateAction } from 'react';

export type PropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
  setPasswordResetNotificationOpen: Dispatch<SetStateAction<boolean>>;
};

import { AuthInputType } from '@/types';
import { JSX } from 'react';

export type PropsType = {
  title: string;
  subTitle: string;
  submitText: string;
  inputs: AuthInputType[];
  hasGoogleAuth?: boolean;
  children?: JSX.Element;
};

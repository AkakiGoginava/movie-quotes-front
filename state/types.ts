import { Dispatch, SetStateAction } from 'react';

import { UseFormSetError, FieldValues } from 'react-hook-form';

import {
  InputFieldType,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  User,
  Category,
  Movie,
  Quote,
} from '@/types';

type FormHandler<T extends FieldValues> = (
  formData: T | FormData,
  setError?: UseFormSetError<T>,
  inputs?: InputFieldType<T>[],
) => Promise<void>;

type FormHandlerFactory<T extends FieldValues> = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => FormHandler<T>;

type FormHandlerWithIdFactory<T extends FieldValues> = (
  id: number,
  options?: { onSuccess?: () => void },
) => FormHandler<T>;

type SimpleMutation = (...args: any[]) => Promise<any>;

type NotificationSetter = Dispatch<SetStateAction<boolean>>;

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isVerified: boolean;
  isGoogleUser: boolean;

  handleRegister: FormHandler<RegisterInput>;
  handleLogin: FormHandler<LoginInput>;
  handleGoogleAuthFactory: (options?: {
    onSuccess?: () => void;
    onError?: () => void;
  }) => SimpleMutation;
  handleLogout: SimpleMutation;

  handleVerifyEmail: (
    token: string,
    setSuccessNotificationOpen: NotificationSetter,
    setInvalidTokenNotificationOpen: NotificationSetter,
  ) => void;

  handleForgotPasswordFactory: FormHandlerFactory<ForgotPasswordInput>;
  handleResetPasswordFactory: FormHandlerFactory<ResetPasswordInput>;
  handleEditUserFactory: FormHandlerFactory<FormData>;
};

export type MovieContextType = {
  categories: Category[] | undefined;
  isLoadingCategories: boolean;

  allMovies: Movie[];
  totalMovies: number;
  isLoadingMovies: boolean;
  isFetchingMoviesNextPage: boolean;
  hasMoviesNextPage: boolean;
  fetchMoviesNextPage: () => void;
  setActiveMoviesSearch: Dispatch<SetStateAction<string>>;

  handleDeleteMovie: SimpleMutation;
  handleStoreMovieFactory: FormHandlerFactory<FormData>;
  handleUpdateMovieFactory: FormHandlerWithIdFactory<FormData>;

  allQuotes: Quote[];
  isLoadingQuotes: boolean;
  isFetchingQuotesNextPage: boolean;
  hasQuotesNextPage: boolean;
  fetchQuotesNextPage: () => void;
  setActiveQuotesSearch: Dispatch<SetStateAction<string>>;

  handleStoreQuoteFactory: FormHandlerWithIdFactory<FormData>;
  handleDeleteQuoteFactory: (movieId: number) => SimpleMutation;
  handleUpdateQuoteFactory: (
    movieId: number,
    quoteId: number,
    options?: { onSuccess?: () => void },
  ) => FormHandler<FormData>;

  handleQuoteLikeFactory: (movieId: number) => SimpleMutation;
  handlePostCommentFactory: (movieId: number) => SimpleMutation;
};

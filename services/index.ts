import { AxiosResponse } from 'axios';
import i18n from '@/src/i18n';

import {
  Category,
  ForgotPasswordInput,
  LikeQuoteResponse,
  LoginInput,
  MoviesResponse,
  Movie,
  PostCommentResponse,
  RegisterInput,
  ResetPasswordInput,
  User,
  QuotesResponse,
  NotificationResponse,
} from '@/types';

import axios from './axios';

const getCsrfCookie = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  data: RegisterInput | FormData,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/register', data, {
    headers: {
      Language: i18n.language,
    },
  });

  return response;
};

export const loginUser = async (
  data: LoginInput | FormData,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/login', data, {
    headers: {
      Language: i18n.language,
    },
  });

  return response;
};

export const logoutUser = async (): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/logout');

  return response;
};

export const getUser = async (): Promise<AxiosResponse<{ user: User }>> => {
  const response = await axios.get('/api/user');

  return response;
};

export const editUser = async (data: FormData): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/user/update', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};

export const checkEmailToken = async (
  token: string,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/email/check-token', { token });

  return response;
};

export const verifyEmail = async (token: string) => {
  await getCsrfCookie();

  const response = await axios.post('/api/email/verify', { token });

  return response;
};

export const requestNewLink = async (
  action: string,
  email: string,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const apiRoute =
    action === 'verify'
      ? '/api/email/request-verification'
      : '/api/forgot-password';

  const response = await axios.post(apiRoute, {
    email,
  });

  return response;
};

export const forgotPassword = async (
  data: ForgotPasswordInput | FormData,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/forgot-password', data, {
    headers: {
      Language: i18n.language,
    },
  });

  return response;
};

export const resetPassword = async (
  data: ResetPasswordInput | FormData,
): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.post('/api/reset-password', data, {
    headers: {
      Language: i18n.language,
    },
  });

  return response;
};

export const googleCallback = async (code: string): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.post('/api/google', { code });

  return response;
};

export const getCategories = async (): Promise<
  AxiosResponse<{ categories: Category[] }>
> => {
  const response = await axios.get('/api/categories');

  return response;
};

export const storeMovie = async (
  formData: FormData,
): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.post('/api/movies', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};

export const updateMovie = async (
  id: number,
  formData: FormData,
): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.post(`/api/movies/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};

export const getUserMovies = async (
  cursor?: string,
  search?: string,
): Promise<AxiosResponse<MoviesResponse>> => {
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor);
  if (search) params.append('filter[title]', search);

  const response = await axios.get(`/api/movies?${params.toString()}`);

  return response;
};

export const getMovie = async (
  id: string,
): Promise<AxiosResponse<{ movie: Movie }>> => {
  const response = await axios.get(`/api/movies/${id}`);

  return response;
};

export const deleteMovie = async (id: string): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.delete(`/api/movies/${id}`);

  return response;
};

export const getQuotes = async (
  cursor?: string,
  search?: string,
): Promise<AxiosResponse<QuotesResponse>> => {
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor);
  if (search) params.append('filter[search]', search);

  const response = await axios.get(`/api/quotes?${params.toString()}`);

  return response;
};

export const storeQuote = async (
  formData: FormData,
): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.post('/api/quotes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};

export const deleteQuote = async (id: string): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.delete(`/api/quotes/${id}`);

  return response;
};

export const updateQuote = async (
  id: number,
  formData: FormData,
): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.post(`/api/quotes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};

export const likeQuote = async (
  id: number,
): Promise<AxiosResponse<LikeQuoteResponse>> => {
  await getCsrfCookie();

  const response = await axios.post(`/api/quotes/${id}/like`);

  return response;
};

export const postComment = async (
  id: number,
  content: string,
): Promise<AxiosResponse<PostCommentResponse>> => {
  await getCsrfCookie();

  const response = await axios.post(`/api/quotes/${id}/comments`, { content });

  return response;
};

export const getNotifications = async (): Promise<NotificationResponse> => {
  const response = await axios.get(`/api/notifications`);

  return response.data;
};

export const markNotificationAsRead = async (id: number) => {
  await getCsrfCookie();

  const response = await axios.post(`/api/notifications/${id}/read`);

  return response;
};

export const markAllNotificationsAsRead = async () => {
  await getCsrfCookie();

  const response = await axios.post('/api/notifications/mark-all-read');

  return response;
};

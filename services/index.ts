import { AxiosResponse } from 'axios';

import {
  Category,
  ForgotPasswordInput,
  LoginInput,
  MoviesResponse,
  RegisterInput,
  ResetPasswordInput,
  User,
} from '@/types';

import axios from './axios';

const getCsrfCookie = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Failed to fetch CSRF cookie', error);
    throw error;
  }
};

export const registerUser = async (
  data: RegisterInput | FormData,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/register', data);

  return response;
};

export const loginUser = async (
  data: LoginInput | FormData,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/login', data);

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

  const response = await axios.post('/api/forgot-password', data);

  return response;
};

export const resetPassword = async (
  data: ResetPasswordInput | FormData,
): Promise<AxiosResponse> => {
  await getCsrfCookie();

  const response = await axios.post('/api/reset-password', data);

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

export const getUserMovies = async (
  cursor?: string,
): Promise<AxiosResponse<MoviesResponse>> => {
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor);

  const response = await axios.get(`/api/user/movies?${params.toString()}`);

  return response;
};

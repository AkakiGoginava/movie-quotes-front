import { AxiosResponse } from 'axios';

import { ForgotPasswordInput, LoginInput, RegisterInput } from '@/types';

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
  data: RegisterInput,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/register', data);

  return response;
};

export const loginUser = async (
  data: LoginInput,
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

export const getUser = async (): Promise<AxiosResponse<{}>> => {
  const response = await axios.get('/api/user');

  return response;
};

export const checkEmailToken = async (
  token: string,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/email/check-token', { token });

  return response;
};

export const requestVerificationEmail = async (
  email: string,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/email/request-verification', {
    email,
  });

  return response;
};

export const verifyEmail = async (token: string) => {
  await getCsrfCookie();

  const response = await axios.post('/api/email/verify', { token });

  return response;
};

export const forgotPassword = async (
  data: ForgotPasswordInput,
): Promise<AxiosResponse<{}>> => {
  await getCsrfCookie();

  const response = await axios.post('/api/forgot-password', data);

  return response;
};

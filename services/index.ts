import { AxiosResponse } from 'axios';

import { RegisterInput } from '@/types';

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

  return axios.post('/api/register', data);
};

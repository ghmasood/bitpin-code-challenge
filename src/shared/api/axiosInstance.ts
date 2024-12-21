import { toast } from 'react-toastify';

import { ENV } from '@/shared/lib';

import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: ENV.BASE_URL,
  headers: { Accept: '*/*', 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`Request made to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`Response received from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.log(error);
    toast.error(error.message || 'An error occurred');

    if (error.response && error.response.status === 401) {
      // for example: if 401 happen, redirect to login page
    }

    return Promise.reject(error);
  }
);

export { api };

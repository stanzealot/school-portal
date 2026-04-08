import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import NProgress from 'nprogress';
import { API_BASE_URL, LOGIN_AUTHORIZATION_HEADER } from '@/lib/env';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants/routes.constants';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    NProgress.start();

    if (config.skipAuth) {
      if (LOGIN_AUTHORIZATION_HEADER) {
        const v = LOGIN_AUTHORIZATION_HEADER.trim();
        config.headers.Authorization = v.startsWith('Bearer ') ? v : `Bearer ${v}`;
      }
    } else {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    NProgress.done();
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error: AxiosError) => {
    NProgress.done();

    const url = error.config?.url ?? '';
    const isLogin = url.includes('/auth/login');

    if (error.response?.status === 401 && !isLogin) {
      useAuthStore.getState().logout();
      window.location.assign(ROUTES.LOGIN);
    }

    return Promise.reject(error);
  },
);

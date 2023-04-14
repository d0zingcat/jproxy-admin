import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';
import i18n from '@/locale/index';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {};
    }
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const locale = localStorage.getItem('arco-locale');
    if (locale) {
      config.headers['Accept-Language'] = locale;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    return response;
  },
  (error) => {
    let message = error.response ? error.response : error.message;
    if (message.data) {
      message = message.data.error ? message.data.error : message.data;
    }
    if (message === 'Forbidden') {
      if (!window.location.href.endsWith('/login')) {
        Message.error({
          content: i18n.global.t('login.forbidden'),
          duration: 5 * 1000,
        });
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } else {
      Message.error({
        content: message || 'Request Error',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  }
);

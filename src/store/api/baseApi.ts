import { createApi, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import api from '@/lib/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Custom base query using axios
const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
  },
  unknown,
  unknown
> => async ({ url, method, data, params, headers }) => {
  try {
    const result = await api({
      url,
      method,
      data,
      params,
      headers,
    } as AxiosRequestConfig);
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

// Create base API
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User', 'Bot', 'Chat', 'Document', 'Auth'],
  endpoints: () => ({}),
});

// Export types for use in other files
export type { AxiosRequestConfig, AxiosResponse, AxiosError };

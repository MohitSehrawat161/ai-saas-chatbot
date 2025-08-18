import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://saas-chatbot-plum.vercel.app/api',
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // important for cookies

});

// Request interceptor (still adding token)
api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? Cookies.get('token') : null;

  if (token) {
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders; // ✅ fix TS type
    }
    // Axios in v1+ uses AxiosHeaders, but fallback for plain object
    if (typeof (config.headers as any).set === 'function') {
      (config.headers as any).set('Authorization', `Bearer ${token}`);
    } else {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});


// Response interceptor — only pass through
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error) // No handling, just rethrow
);

export default api;

export const createApiEndpoint = (endpoint: string) => {
  return {
    get: (params?: any) => api.get(endpoint, { params }),
    post: (data?: any, config?: AxiosRequestConfig) => api.post(endpoint, data, config),
    put: (data?: any, config?: AxiosRequestConfig) => api.put(endpoint, data, config),
    patch: (data?: any, config?: AxiosRequestConfig) => api.patch(endpoint, data, config),
    delete: (config?: AxiosRequestConfig) => api.delete(endpoint, config),
  };
};

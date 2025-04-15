import axios from 'axios';
import apiConfig from '../config/apiConfig';

export const authApi = axios.create({
  baseURL: apiConfig.getAuthBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
});

export const ragApi = axios.create({
  baseURL: apiConfig.getRagBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
});

authApi.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
ragApi.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

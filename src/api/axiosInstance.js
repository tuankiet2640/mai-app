import axios from 'axios';
import apiConfig from '../config/apiConfig';

console.log('[axiosInstance] Creating authApi with baseURL:', apiConfig.getAuthBaseUrl());
export const authApi = axios.create({
  baseURL: apiConfig.getAuthBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
});

console.log('[axiosInstance] Creating ragApi with baseURL:', apiConfig.getRagBaseUrl());
export const ragApi = axios.create({
  baseURL: apiConfig.getRagBaseUrl(),
  headers: { 'Content-Type': 'application/json' }
});

authApi.interceptors.request.use(config => {
  console.log('[axiosInstance] authApi request:', config.baseURL + config.url);

  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
ragApi.interceptors.request.use(config => {
  console.log('[axiosInstance] ragApi request:', config.baseURL + config.url);

  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

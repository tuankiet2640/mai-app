/**
 * API Service
 * 
 * Handles API requests with automatic switching between mock and production data.
 */
import axios from 'axios';
import appConfig from '../config/appConfig';
import { getMockData, mockDelay } from '../mock-data';

// Create axios instance with base URL from config
const apiClient = axios.create({
  baseURL: appConfig.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token to headers if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Make an API request with automatic switching between mock and production
 * @param {string} method - HTTP method (get, post, put, delete)
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body data
 * @param {object} options - Additional axios options
 * @returns {Promise<any>} API response
 */
export const apiRequest = async (method, endpoint, data = null, options = {}) => {
  // Determine if we should use mock data
  const useMock = appConfig.api.isMockMode();
  
  if (useMock) {
    // Parse endpoint to determine collection and key
    // Format: /collection/key or /collection
    const parts = endpoint.split('/').filter(Boolean);
    const collection = parts[0];
    const key = parts[1] || 'default';
    
    try {
      // Simulate network delay for realistic mock experience
      await mockDelay();
      
      // Get mock data
      const mockResponse = getMockData(collection, method, { key, data });
      
      // If mock data is not found, throw error
      if (!mockResponse) {
        throw new Error(`No mock data available for ${method} ${endpoint}`);
      }
      
      return { data: mockResponse };
    } catch (error) {
      console.error(`Mock API error (${method} ${endpoint}):`, error);
      throw error;
    }
  }
  
  // Use real API
  try {
    const config = {
      method,
      url: endpoint,
      ...options,
    };
    
    if (data && ['post', 'put', 'patch'].includes(method)) {
      config.data = data;
    }
    
    return await apiClient(config);
  } catch (error) {
    console.error(`API request error (${method} ${endpoint}):`, error);
    throw error;
  }
};

// Convenience methods for common HTTP verbs
export const get = (endpoint, options = {}) => apiRequest('get', endpoint, null, options);
export const post = (endpoint, data, options = {}) => apiRequest('post', endpoint, data, options);
export const put = (endpoint, data, options = {}) => apiRequest('put', endpoint, data, options);
export const del = (endpoint, options = {}) => apiRequest('delete', endpoint, null, options);

// Export default object with all methods
export default {
  get,
  post,
  put,
  delete: del,
  request: apiRequest
};

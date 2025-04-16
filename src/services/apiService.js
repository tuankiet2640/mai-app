import axios from 'axios';
import apiConfig from '../config/apiConfig';

/**
 * Helper to get JWT from localStorage
 */
function getAuthToken() {
  return localStorage.getItem('accessToken');
}

/**
 * Base API Service
 * 
 * This service handles API requests with the ability to switch between
 
 */
class ApiService {
  /**
   * @param {string} endpoint - base endpoint path for this service (e.g., /users)
   * @param {string} [baseUrl] - override base URL (for mai-services or rag-service)
   */
  constructor(endpoint, baseUrl) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: baseUrl || apiConfig.getAuthBaseUrl(),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for authentication
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          const refreshed = await this.refreshToken();
          if (refreshed) {
            const originalRequest = error.config;
            return this.axiosInstance(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get an ApiService instance for mai-services (auth/user)
   */
  static maiServices(endpoint) {
    return new ApiService(endpoint, apiConfig.getAuthBaseUrl());
  }

  /**
   * Get an ApiService instance for rag-service (knowledge base, RAG)
   */
  static ragService(endpoint) {
    return new ApiService(endpoint, apiConfig.getRagBaseUrl());
  }

  /**
   * Attempt to refresh the authentication token
   * @returns {Promise<boolean>} True if token was refreshed successfully
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await axios.post(`${apiConfig.getAuthBaseUrl()}/auth/refresh`, {
        refreshToken,
      });
      
      if (response.data && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        return true;
      }
      return false;
    } catch (error) {
      // If refresh fails, log out the user
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      return false;
    }
  }

  /**
   * Make an API request with automatic switching between mock and production
   * @param {string} method - HTTP method
   * @param {string} path - API path
   * @param {object} data - Request body data
   * @param {object} params - URL parameters
   * @param {object} options - Additional axios options
   * @returns {Promise<any>} API response
   */
  async request(method, path = '', data = null, params = {}, options = {}) {
    // Otherwise, make a real API request
    try {
      const config = {
        method,
        url: path,
        ...options,
      };

      if (data && ['post', 'put', 'patch'].includes(method.toLowerCase())) {
        config.data = data;
      }

      if (params && Object.keys(params).length > 0) {
        config.params = params;
      }

      return await this.axiosInstance(config);
    } catch (error) {
      console.error(`API request error (${method} ${this.endpoint}/${path}):`, error);
      throw error;
    }
  }

  // Convenience methods for common HTTP verbs
  async get(path = '', params = {}, options = {}) {
    return this.request('get', path, null, params, options);
  }

  async post(path = '', data = {}, options = {}) {
    return this.request('post', path, data, {}, options);
  }

  async put(path = '', data = {}, options = {}) {
    return this.request('put', path, data, {}, options);
  }

  async patch(path = '', data = {}, options = {}) {
    return this.request('patch', path, data, {}, options);
  }

  async delete(path = '', options = {}) {
    return this.request('delete', path, null, {}, options);
  }
}

export default ApiService;

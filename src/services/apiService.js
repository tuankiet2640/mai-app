import axios from 'axios';
import apiConfig from '../config/apiConfig';

/**
 * Base API Service
 * 
 * This service handles API requests with the ability to switch between
 * mock data and production APIs based on configuration.
 */
class ApiService {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: apiConfig.getBaseUrl(),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for authentication
    this.axiosInstance.interceptors.request.use(
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

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Handle 401 Unauthorized errors (token expired)
        if (error.response && error.response.status === 401) {
          // Attempt to refresh token
          const refreshed = await this.refreshToken();
          if (refreshed) {
            // Retry the original request
            const originalRequest = error.config;
            return this.axiosInstance(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Attempt to refresh the authentication token
   * @returns {Promise<boolean>} True if token was refreshed successfully
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await axios.post(`${apiConfig.getBaseUrl()}/auth/refresh`, {
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
   * Get mock data for the specified endpoint and method
   * @param {string} method - HTTP method
   * @param {string} path - API path
   * @param {object} params - Request parameters
   * @returns {Promise<any>} Mock data response
   */
  async getMockData(method, path, params = {}) {
    try {
      // Simulate network delay
      await apiConfig.simulateDelay();

      // Import the mock data module dynamically
      const mockPath = `../mock-data/api/${this.endpoint}${path ? `/${path}` : ''}`;
      const mockModule = await import(`${mockPath}.js`);
      
      // Get the appropriate mock data based on the method
      const mockFunction = mockModule[`mock${method.toUpperCase()}`];
      
      if (typeof mockFunction === 'function') {
        return { data: mockFunction(params) };
      }
      
      // Fallback to the default export if no method-specific mock is found
      return { data: mockModule.default };
    } catch (error) {
      console.error(`Error loading mock data for ${this.endpoint}/${path}:`, error);
      throw new Error(`No mock data available for ${this.endpoint}/${path}`);
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
    // Use mock data if in mock mode
    if (apiConfig.isMockMode()) {
      return this.getMockData(method, path, { ...params, ...data });
    }

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

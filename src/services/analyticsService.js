/**
 * Analytics Service
 * 
 * This service handles all API calls related to analytics data, with support
 * for both mock data and real API endpoints based on environment configuration.
 */

import axios from 'axios';

// Get environment configuration
const API_MODE = process.env.REACT_APP_API_MODE || 'api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance for API calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or your auth state management
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Handles API errors in a consistent way
 * @param {Error} error - The error object
 * @param {string} defaultMessage - Default message to show if error details are not available
 * @returns {string} - Formatted error message
 */
const handleApiError = (error, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  let errorMessage = defaultMessage;
  
  if (error.response) {
    // The server responded with an error status
    const serverError = error.response.data;
    errorMessage = serverError.message || 
                  serverError.error || 
                  `Error ${error.response.status}: ${defaultMessage}`;
    
    // Handle session expiration
    if (error.response.status === 401) {
      // You might want to redirect to login or refresh the token
      console.warn('Authentication error - user may need to log in again');
    }
  } else if (error.request) {
    // No response received from server
    errorMessage = 'No response from server. Please check your connection.';
  }
  
  return errorMessage;
};

/**
 * Analytics API service with support for both mock and real data
 */
export const analyticsService = {
  /**
   * Fetches system metrics data
   * @param {Object} params - Query parameters (e.g. days)
   * @returns {Promise<Object>} - System metrics data
   */
  getSystemMetrics: async (params = {}) => {
    // Use mock data if API_MODE is set to 'mock'

    
    try {
      const response = await apiClient.get('/analytics/system-metrics', { params });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to fetch system metrics');
      throw new Error(errorMessage);
    }
  },
  
  /**
   * Fetches model usage statistics
   * @param {Object} params - Query parameters (e.g. days, model_id)
   * @returns {Promise<Object>} - Model usage data
   */
  getModelUsage: async (params = {}) => {

    
    try {
      const response = await apiClient.get('/analytics/model-usage', { params });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to fetch model usage data');
      throw new Error(errorMessage);
    }
  },
  
  /**
   * Fetches knowledge base usage statistics
   * @param {Object} params - Query parameters (e.g. days, kb_id)
   * @returns {Promise<Object>} - Knowledge base usage data
   */
  getKnowledgeBaseUsage: async (params = {}) => {

    
    try {
      const response = await apiClient.get('/analytics/kb-usage', { params });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to fetch knowledge base usage data');
      throw new Error(errorMessage);
    }
  },
  
  /**
   * Fetches user activity statistics
   * @param {Object} params - Query parameters (e.g. days)
   * @returns {Promise<Object>} - User activity data
   */
  getUserActivity: async (params = {}) => {

    
    try {
      const response = await apiClient.get('/analytics/user-activity', { params });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to fetch user activity data');
      throw new Error(errorMessage);
    }
  },
  
  /**
   * Fetches system logs
   * @param {Object} params - Query parameters (e.g. page, limit, level, service)
   * @returns {Promise<Object>} - System logs with pagination
   */
  getSystemLogs: async (params = {}) => {

    
    try {
      const response = await apiClient.get('/analytics/system-logs', { params });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to fetch system logs');
      throw new Error(errorMessage);
    }
  }
};

export default analyticsService;

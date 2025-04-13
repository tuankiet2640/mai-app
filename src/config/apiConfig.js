/**
 * API Configuration
 * 
 * This file manages the configuration for API services, including the ability
 * to switch between mock data and production APIs.
 */

// Get environment variables with fallbacks
const API_MODE = process.env.REACT_APP_API_MODE || 'mock';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const MOCK_DELAY_MS = parseInt(process.env.REACT_APP_MOCK_DELAY_MS || '300', 10);

// Configuration object
const apiConfig = {
  // Current API mode: 'mock' or 'production'
  mode: API_MODE,
  
  // Base URLs for different environments
  baseUrls: {
    mock: '/mock-data/api',
    production: API_BASE_URL,
  },
  
  // Delay for mock responses to simulate network latency (in milliseconds)
  mockDelay: MOCK_DELAY_MS,
  
  // Helper function to get the current base URL based on mode
  getBaseUrl: function() {
    return this.baseUrls[this.mode] || this.baseUrls.mock;
  },
  
  // Helper function to determine if we're using mock data
  isMockMode: function() {
    return this.mode === 'mock';
  },
  
  // Helper function to simulate network delay for mock data
  simulateDelay: async function() {
    if (this.isMockMode()) {
      return new Promise(resolve => setTimeout(resolve, this.mockDelay));
    }
    return Promise.resolve();
  }
};

export default apiConfig;

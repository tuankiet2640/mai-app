/**
 * Application Configuration
 * 
 * Central configuration for the application, including API settings
 * and feature flags.
 */

// API Configuration
const API_CONFIG = {
  // API mode can be 'mock' or 'production'
  mode: process.env.REACT_APP_API_MODE || 'mock',
  
  // Base URLs
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  
  // Helper methods
  isMockMode: function() {
    return this.mode === 'mock';
  }
};

// Feature Flags
const FEATURES = {
  // Core features
  darkMode: true,
  notifications: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
  
  // Admin features
  adminDashboard: true
};

// Export configuration
const appConfig = {
  api: API_CONFIG,
  features: FEATURES,
  
  // Development helpers - only available in development mode
  dev: {
    // Toggle between mock and production mode (only in development)
    toggleApiMode: function() {
      if (process.env.NODE_ENV !== 'development') return;
      
      API_CONFIG.mode = API_CONFIG.mode === 'mock' ? 'production' : 'mock';
      console.log(`API mode switched to: ${API_CONFIG.mode}`);
      
      // Force page reload to apply changes
      window.location.reload();
    }
  }
};

export default appConfig;

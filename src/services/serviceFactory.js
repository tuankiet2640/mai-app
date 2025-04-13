import apiConfig from '../config/apiConfig';
import authService from './authService';
import adminService from './adminService';

// Import other services as needed
// import userService from './userService';
// import agentService from './agentService';
// import chatService from './chatService';

/**
 * Service Factory
 * 
 * Centralizes access to all API services and provides information about
 * the current API mode (mock or production).
 */
class ServiceFactory {
  constructor() {
    this.services = {
      auth: authService,
      admin: adminService,
      // Add other services here as they are implemented
      // user: userService,
      // agent: agentService,
      // chat: chatService,
    };
    
    // API mode information
    this.apiMode = apiConfig.mode;
    this.isMockMode = apiConfig.isMockMode();
  }

  /**
   * Get a service instance by name
   * @param {string} serviceName - Name of the service to retrieve
   * @returns {object} Service instance
   */
  getService(serviceName) {
    const service = this.services[serviceName];
    
    if (!service) {
      console.warn(`Service '${serviceName}' not found in ServiceFactory`);
      return null;
    }
    
    return service;
  }

  /**
   * Get the current API mode
   * @returns {string} Current API mode ('mock' or 'production')
   */
  getApiMode() {
    return this.apiMode;
  }

  /**
   * Check if the application is using mock data
   * @returns {boolean} True if using mock data
   */
  isUsingMockData() {
    return this.isMockMode;
  }

  /**
   * Toggle between mock and production API modes
   * Note: This only works during development and for testing
   * In production, the mode should be set via environment variables
   * @param {string} newMode - New API mode ('mock' or 'production')
   */
  toggleApiMode(newMode) {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('API mode can only be toggled in development mode');
      return;
    }
    
    if (newMode !== 'mock' && newMode !== 'production') {
      console.error('Invalid API mode. Use "mock" or "production"');
      return;
    }
    
    // Update apiConfig mode
    apiConfig.mode = newMode;
    this.apiMode = newMode;
    this.isMockMode = apiConfig.isMockMode();
    
    console.log(`API mode switched to: ${newMode}`);
  }
}

// Create and export a singleton instance
const serviceFactory = new ServiceFactory();
export default serviceFactory;

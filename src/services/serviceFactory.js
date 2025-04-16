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
   */
  getApiMode() {
    return this.apiMode;
  }
}


// Create and export a singleton instance
const serviceFactory = new ServiceFactory();
export default serviceFactory;

/**
 * Mock Data Index
 * 
 * Central export point for all mock data used in the application.
 * This allows for easy switching between mock and production data.
 */
import appConfig from '../config/appConfig';

// Import mock data collections
import * as authMocks from './auth';
import * as userMocks from './users';
import * as adminMocks from './admin';
import * as agentMocks from './agents';
import * as chatMocks from './chat';

// Export all mock data collections
export const mockData = {
  auth: authMocks,
  users: userMocks,
  admin: adminMocks,
  agents: agentMocks,
  chat: chatMocks
};

/**
 * Get mock data for a specific collection and key
 * @param {string} collection - The collection name (e.g., 'auth', 'users')
 * @param {string} key - The specific mock data key
 * @param {object} params - Optional parameters to customize the mock data
 * @returns {any} The requested mock data
 */
export const getMockData = (collection, key, params = {}) => {
  // Check if we're in mock mode
  if (!appConfig.api.isMockMode()) {
    console.warn('Attempted to get mock data while not in mock mode');
    return null;
  }
  
  // Get the collection
  const collectionData = mockData[collection];
  if (!collectionData) {
    console.error(`Mock data collection '${collection}' not found`);
    return null;
  }
  
  // Get the specific mock data
  const data = collectionData[key];
  if (!data) {
    console.error(`Mock data key '${key}' not found in collection '${collection}'`);
    return null;
  }
  
  // If the data is a function, call it with the params
  if (typeof data === 'function') {
    return data(params);
  }
  
  // Otherwise, return the data directly
  return data;
};

/**
 * Simulate API delay for consistent mock experience
 * @param {number} ms - Delay in milliseconds (default: 300)
 * @returns {Promise<void>} Promise that resolves after the delay
 */
export const mockDelay = (ms = 300) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

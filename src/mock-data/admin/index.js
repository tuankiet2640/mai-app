/**
 * Admin Mock Data Index
 * 
 * Central export point for all admin-related mock data.
 */

import dashboardStatsData from './dashboard/stats';

/**
 * Get dashboard statistics
 * @param {object} params - Query parameters
 * @returns {object} Dashboard statistics
 */
export const dashboardStats = () => {
  return dashboardStatsData;
};

/**
 * Get user management data
 * @param {object} params - Query parameters
 * @returns {object} User management data
 */
export const users = (params = {}) => {
  // This would be implemented with actual mock data
  return {
    users: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0
    }
  };
};

/**
 * Get system logs
 * @param {object} params - Query parameters
 * @returns {object} System logs
 */
export const logs = (params = {}) => {
  // This would be implemented with actual mock data
  return {
    logs: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 20,
      pages: 0
    }
  };
};

import { authApi } from '../api/axiosInstance';
import appConfig from '../config/appConfig';

/**
 * Admin Service
 * 
 * Handles admin-specific operations including user management,
 * system configuration, and analytics.
 */
class AdminService {
  constructor() {
    // Base endpoint for admin API
    this.baseEndpoint = 'admin';
    
    // Admin feature flags
    this.features = {
      dashboard: true,
      analytics: true,
      userManagement: true,
      agentManagement: true,
      serviceManagement: true,
      tokenManagement: true,
      settings: true
    };
  }

  /**
   * Check if a specific admin feature is enabled
   * @param {string} featureName - Name of the feature to check
   * @returns {boolean} Whether the feature is enabled
   */
  isFeatureEnabled(featureName) {
    return this.features[featureName] === true;
  }

  /**
   * Get all enabled admin features
   * @returns {object} Object with feature names as keys and boolean values
   */
  getEnabledFeatures() {
    return this.features;
  }

  /**
   * Get dashboard statistics
   * @param {object} params - Query parameters (timeRange, filters)
   * @returns {Promise<object>} Dashboard statistics
   */
  async getDashboardStats(params = {}) {
    try {
      const response = await authApi.get(`${this.baseEndpoint}/dashboard/stats`, { params });
      return response.data;
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  }

  /**
   * Register a new user (admin action)
   * @param {object} userData - { username, email, password, firstName, lastName }
   * @returns {Promise<object>} Registration response
   */
  async registerUser(userData) {
    try {
      console.log('[adminService] registerUser: baseURL =', authApi.defaults.baseURL, 'request = /auth/register');
      // TODO: Implement with RTK Query or a proper API call
      // const response = await api.post('/auth/register', userData);
      throw new Error('Register user is not implemented. Use RTK Query for API calls.');
    } catch (error) {
      console.error('Admin register user error:', error);
      throw error;
    }
  }

  /**
   * Get user list with pagination and filtering
   * @param {object} params - Query parameters (page, limit, search, sort, filter)
   * @returns {Promise<object>} Paginated user list
   */
  async getUsers(params = {}) {
    try {
      console.log('[adminService] getUsers: baseURL =', authApi.defaults.baseURL, 'request = /users');
      const response = await authApi.get('/users', { params });
      return response.data;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }

  /**
   * Get a specific user by ID
   * @param {string} userId - User ID
   * @returns {Promise<object>} User details
   */
  async getUserById(userId) {
    try {
      console.log('[adminService] getUserById: baseURL =', authApi.defaults.baseURL, `request = /users/${userId}`);
      const response = await authApi.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Get user ${userId} error:`, error);
      throw error;
    }
  }

  /**
   * Update a user
   * @param {string} userId - User ID
   * @param {object} userData - Updated user data
   * @returns {Promise<object>} Updated user
   */
  async updateUser(userId, userData) {
    try {
      console.log('[adminService] updateUser: baseURL =', authApi.defaults.baseURL, `request = /users/${userId}`);
      const response = await authApi.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Update user ${userId} error:`, error);
      throw error;
    }
  }

  /**
   * Delete a user
   * @param {string} userId - User ID
   * @returns {Promise<object>} Deletion result
   */
  async deleteUser(userId) {
    try {
      console.log('[adminService] deleteUser: baseURL =', authApi.defaults.baseURL, `request = /users/${userId}`);
      const response = await authApi.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Delete user ${userId} error:`, error);
      throw error;
    }
  }

  /**
   * Get agent list with pagination and filtering
   * @param {object} params - Query parameters (page, limit, search, sort, filter)
   * @returns {Promise<object>} Paginated agent list
   */
  async getAgents(params = {}) {
    try {
      const response = await this.get('agents', params);
      return response.data;
    } catch (error) {
      console.error('Get agents error:', error);
      throw error;
    }
  }

  /**
   * Get a specific agent by ID
   * @param {string} agentId - Agent ID
   * @returns {Promise<object>} Agent details
   */
  async getAgentById(agentId) {
    try {
      const response = await this.get(`agents/${agentId}`);
      return response.data;
    } catch (error) {
      console.error(`Get agent ${agentId} error:`, error);
      throw error;
    }
  }

  /**
   * Update an agent
   * @param {string} agentId - Agent ID
   * @param {object} agentData - Updated agent data
   * @returns {Promise<object>} Updated agent
   */
  async updateAgent(agentId, agentData) {
    try {
      const response = await this.put(`agents/${agentId}`, agentData);
      return response.data;
    } catch (error) {
      console.error(`Update agent ${agentId} error:`, error);
      throw error;
    }
  }

  /**
   * Get service list with pagination and filtering
   * @param {object} params - Query parameters (page, limit, search, sort, filter)
   * @returns {Promise<object>} Paginated service list
   */
  async getServices(params = {}) {
    try {
      const response = await this.get('services', params);
      return response.data;
    } catch (error) {
      console.error('Get services error:', error);
      throw error;
    }
  }

  /**
   * Get a specific service by ID
   * @param {string} serviceId - Service ID
   * @returns {Promise<object>} Service details
   */
  async getServiceById(serviceId) {
    try {
      const response = await this.get(`services/${serviceId}`);
      return response.data;
    } catch (error) {
      console.error(`Get service ${serviceId} error:`, error);
      throw error;
    }
  }

  /**
   * Update a service
   * @param {string} serviceId - Service ID
   * @param {object} serviceData - Updated service data
   * @returns {Promise<object>} Updated service
   */
  async updateService(serviceId, serviceData) {
    try {
      const response = await this.put(`services/${serviceId}`, serviceData);
      return response.data;
    } catch (error) {
      console.error(`Update service ${serviceId} error:`, error);
      throw error;
    }
  }

  /**
   * Get system settings
   * @returns {Promise<object>} System settings
   */
  async getSettings() {
    try {
      const response = await this.get('settings');
      return response.data;
    } catch (error) {
      console.error('Get settings error:', error);
      throw error;
    }
  }

  /**
   * Update system settings
   * @param {object} settingsData - Updated settings
   * @returns {Promise<object>} Updated settings
   */
  async updateSettings(settingsData) {
    try {
      const response = await this.put('settings', settingsData);
      return response.data;
    } catch (error) {
      console.error('Update settings error:', error);
      throw error;
    }
  }

  /**
   * Get analytics data
   * @param {object} params - Query parameters (timeRange, metrics, filters)
   * @returns {Promise<object>} Analytics data
   */
  async getAnalytics(params = {}) {
    try {
      const response = await this.get('analytics', params);
      return response.data;
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }

  /**
   * Get token usage statistics
   * @param {object} params - Query parameters (timeRange, filters)
   * @returns {Promise<object>} Token usage statistics
   */
  async getTokenUsage(params = {}) {
    try {
      const response = await this.get('tokens/usage', params);
      return response.data;
    } catch (error) {
      console.error('Get token usage error:', error);
      throw error;
    }
  }

  /**
   * Get API keys
   * @returns {Promise<object>} API keys
   */
  async getApiKeys() {
    try {
      const response = await this.get('tokens/api-keys');
      return response.data;
    } catch (error) {
      console.error('Get API keys error:', error);
      throw error;
    }
  }

  /**
   * Create a new API key
   * @param {object} keyData - API key data (name, permissions, expiresAt)
   * @returns {Promise<object>} Created API key
   */
  async createApiKey(keyData) {
    try {
      const response = await this.post('tokens/api-keys', keyData);
      return response.data;
    } catch (error) {
      console.error('Create API key error:', error);
      throw error;
    }
  }

  /**
   * Revoke an API key
   * @param {string} keyId - API key ID
   * @returns {Promise<object>} Revocation result
   */
  async revokeApiKey(keyId) {
    try {
      const response = await this.delete(`tokens/api-keys/${keyId}`);
      return response.data;
    } catch (error) {
      console.error(`Revoke API key ${keyId} error:`, error);
      throw error;
    }
  }
}

const adminService = new AdminService();
export default adminService;

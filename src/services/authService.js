import ApiService from './apiService';

/**
 * Authentication Service
 * 
 * Handles user authentication operations including login, registration,
 * token management, and user profile.
 */
class AuthService extends ApiService {
  constructor() {
    super('auth');
  }

  /**
   * Log in a user
   * @param {object} credentials - User credentials (email, password)
   * @returns {Promise<object>} User data and tokens
   */
  async login(credentials) {
    try {
      const response = await this.post('login', credentials);
      
      if (response.data && response.data.tokens) {
        // Store tokens and user data
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise<object>} User data and tokens
   */
  async register(userData) {
    try {
      const response = await this.post('register', userData);
      
      if (response.data && response.data.tokens) {
        // Store tokens and user data
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Log out the current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // Call logout endpoint if in production mode
      if (!this.isMockMode()) {
        await this.post('logout');
      }
      
      // Clear local storage regardless of API mode
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear tokens even if API call fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      throw error;
    }
  }

  /**
   * Get the current user profile
   * @returns {Promise<object>} User profile data
   */
  async getProfile() {
    try {
      const response = await this.get('profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  /**
   * Update the current user profile
   * @param {object} profileData - Updated profile data
   * @returns {Promise<object>} Updated user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await this.put('profile', profileData);
      
      // Update stored user data
      if (response.data) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...currentUser,
          ...response.data
        }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  /**
   * Check if the user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Get the current user data
   * @returns {object|null} User data or null if not authenticated
   */
  getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}

const authService = new AuthService();
export default authService;

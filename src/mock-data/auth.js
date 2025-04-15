/**
 * Authentication Mock Data
 * 
 * Mock data for authentication-related API calls.
 */

// Mock users for authentication
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, passwords would never be stored like this
    role: 'admin',
    isAdmin: true,
    avatar: null,
    createdAt: '2025-01-15T08:00:00.000Z',
    accountType: 'Premium'
  },
  {
    id: '2',
    username: 'user',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
    isAdmin: false,
    avatar: null,
    createdAt: '2025-02-20T10:30:00.000Z',
    accountType: 'Free'
  }
];

/**
 * Mock login implementation
 * @param {object} credentials - User credentials (email, password)
 * @returns {object} Login response with user data and tokens
 */
export const login = (credentials) => {
  const { username, email, password } = credentials;

  // Find user with matching username or email
  const user = mockUsers.find(u =>
    (username && u.username === username) ||
    (email && u.email === email)
  );

  // Check if user exists and password matches
  if (user && user.password === password) {
    // Create a sanitized user object (without password)
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens: {
        accessToken: `mock-token-${user.id}`,
        refreshToken: `mock-refresh-token-${user.id}`
      }
    };
  }

  // Authentication failed
  throw new Error('Invalid username/email or password');
};

/**
 * Mock register implementation
 * @param {object} userData - User registration data
 * @returns {object} Registration response with user data and tokens
 */
export const register = (userData) => {
  const { email, password, name } = userData;
  
  // Check if user with this email already exists
  if (mockUsers.some(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: `${mockUsers.length + 1}`,
    name: name || email.split('@')[0],
    email,
    password,
    role: 'user',
    isAdmin: false,
    avatar: null,
    createdAt: new Date().toISOString(),
    accountType: 'Free'
  };
  
  // Add to mock users (in a real app, this would persist)
  mockUsers.push(newUser);
  
  // Create a sanitized user object (without password)
  const { password: pwd, ...userWithoutPassword } = newUser;
  
  return {
    user: userWithoutPassword,
    tokens: {
      accessToken: `mock-token-${newUser.id}`,
      refreshToken: `mock-refresh-token-${newUser.id}`
    }
  };
};

/**
 * Mock profile retrieval
 * @param {string} userId - User ID
 * @returns {object} User profile data
 */
export const getProfile = (userId) => {
  // Find user by ID
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Mock profile update
 * @param {string} userId - User ID
 * @param {object} profileData - Updated profile data
 * @returns {object} Updated user profile
 */
export const updateProfile = (userId, profileData) => {
  // Find user by ID
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update user data (excluding sensitive fields)
  const { password, role, isAdmin, id, email, ...updatableFields } = profileData;
  
  // Update user in mock data
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updatableFields
  };
  
  // Return updated user without password
  const { password: pwd, ...userWithoutPassword } = mockUsers[userIndex];
  return userWithoutPassword;
};

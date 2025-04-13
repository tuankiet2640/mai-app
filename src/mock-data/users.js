/**
 * Users Mock Data
 * 
 * Mock data for user-related API calls.
 */

// Generate a list of mock users
const generateMockUsers = (count = 20) => {
  const roles = ['user', 'premium', 'admin'];
  const accountTypes = ['Free', 'Basic', 'Premium', 'Enterprise'];
  const statuses = ['active', 'inactive', 'suspended'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    accountType: accountTypes[Math.floor(Math.random() * accountTypes.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    avatar: null,
    isVerified: Math.random() > 0.2
  }));
};

// Mock users list
const mockUsers = generateMockUsers();

/**
 * Get all users with pagination and filtering
 * @param {object} params - Query parameters
 * @returns {object} Paginated users list
 */
export const getUsers = (params = {}) => {
  const { page = 1, limit = 10, search = '', role = '', status = '' } = params;
  
  // Filter users based on search and filters
  let filteredUsers = [...mockUsers];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower)
    );
  }
  
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }
  
  if (status) {
    filteredUsers = filteredUsers.filter(user => user.status === status);
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  return {
    users: paginatedUsers,
    pagination: {
      total: filteredUsers.length,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(filteredUsers.length / limit)
    }
  };
};

/**
 * Get a user by ID
 * @param {string} userId - User ID
 * @returns {object} User data
 */
export const getUserById = (userId) => {
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};

/**
 * Create a new user
 * @param {object} userData - User data
 * @returns {object} Created user
 */
export const createUser = (userData) => {
  // Check if email already exists
  if (mockUsers.some(u => u.email === userData.email)) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: `${mockUsers.length + 1}`,
    ...userData,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    isVerified: false
  };
  
  // Add to mock users
  mockUsers.push(newUser);
  
  return newUser;
};

/**
 * Update a user
 * @param {string} userId - User ID
 * @param {object} userData - Updated user data
 * @returns {object} Updated user
 */
export const updateUser = (userId, userData) => {
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update user
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...userData,
    // Protect these fields from being overwritten
    id: mockUsers[userIndex].id,
    createdAt: mockUsers[userIndex].createdAt
  };
  
  return mockUsers[userIndex];
};

/**
 * Delete a user
 * @param {string} userId - User ID
 * @returns {boolean} Success status
 */
export const deleteUser = (userId) => {
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Remove user
  mockUsers.splice(userIndex, 1);
  
  return true;
};

/**
 * Mock implementation for admin/users endpoint
 */

// Generate mock users
const generateMockUsers = (count = 20) => {
  const roles = ['user', 'admin', 'developer', 'content_creator'];
  const accountTypes = ['Free', 'Basic', 'Premium', 'Enterprise'];
  const users = [];
  
  for (let i = 1; i <= count; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const accountType = accountTypes[Math.floor(Math.random() * accountTypes.length)];
    const isAdmin = role === 'admin';
    const createdAt = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365).toISOString();
    
    users.push({
      id: `${i}`,
      name: `User ${i}`,
      email: i === 1 ? 'admin@example.com' : `user${i}@example.com`,
      role: i === 1 ? 'admin' : role,
      isAdmin: i === 1 ? true : isAdmin,
      avatar: null,
      createdAt,
      accountType: i === 1 ? 'Enterprise' : accountType,
      status: Math.random() > 0.1 ? 'active' : 'inactive',
      lastLogin: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString(),
      usage: {
        tokensUsed: Math.floor(Math.random() * 100000),
        requestsThisMonth: Math.floor(Math.random() * 1000),
        lastActive: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7).toISOString()
      }
    });
  }
  
  return users;
};

// Mock users data
const mockUsers = generateMockUsers(20);

export const mockGET = (params = {}) => {
  // Default pagination
  const page = parseInt(params.page, 10) || 1;
  const limit = parseInt(params.limit, 10) || 10;
  const search = params.search || '';
  const sort = params.sort || 'createdAt';
  const order = params.order || 'desc';
  const filter = params.filter || {};
  
  // Filter users based on search term
  let filteredUsers = [...mockUsers];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply additional filters
  if (filter.role) {
    filteredUsers = filteredUsers.filter(user => user.role === filter.role);
  }
  
  if (filter.accountType) {
    filteredUsers = filteredUsers.filter(user => user.accountType === filter.accountType);
  }
  
  if (filter.status) {
    filteredUsers = filteredUsers.filter(user => user.status === filter.status);
  }
  
  // Sort users
  filteredUsers.sort((a, b) => {
    let valueA = a[sort];
    let valueB = b[sort];
    
    // Handle nested properties
    if (sort.includes('.')) {
      const parts = sort.split('.');
      valueA = parts.reduce((obj, key) => obj && obj[key], a);
      valueB = parts.reduce((obj, key) => obj && obj[key], b);
    }
    
    // Handle different types
    if (typeof valueA === 'string') {
      return order === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    return order === 'asc' ? valueA - valueB : valueB - valueA;
  });
  
  // Paginate users
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  return {
    users: paginatedUsers,
    pagination: {
      total: filteredUsers.length,
      page,
      limit,
      pages: Math.ceil(filteredUsers.length / limit)
    }
  };
};

export const mockGET_ID = (id) => {
  const user = mockUsers.find(user => user.id === id);
  
  if (!user) {
    throw {
      response: {
        status: 404,
        data: {
          message: `User with ID ${id} not found`
        }
      }
    };
  }
  
  return user;
};

export const mockPUT = (id, data) => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw {
      response: {
        status: 404,
        data: {
          message: `User with ID ${id} not found`
        }
      }
    };
  }
  
  // Update user with new data
  const updatedUser = {
    ...mockUsers[userIndex],
    ...data,
    // Don't allow changing these fields
    id: mockUsers[userIndex].id,
    createdAt: mockUsers[userIndex].createdAt
  };
  
  // Update mock data
  mockUsers[userIndex] = updatedUser;
  
  return updatedUser;
};

export const mockDELETE = (id) => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw {
      response: {
        status: 404,
        data: {
          message: `User with ID ${id} not found`
        }
      }
    };
  }
  
  // Remove user from mock data
  mockUsers.splice(userIndex, 1);
  
  return { success: true, message: `User with ID ${id} deleted successfully` };
};

// Handle dynamic paths like /users/:id
export const mockGET_PATH = (path) => {
  const parts = path.split('/');
  if (parts.length === 2 && parts[0] === '') {
    return mockGET_ID(parts[1]);
  }
  return null;
};

export const mockPUT_PATH = (path, data) => {
  const parts = path.split('/');
  if (parts.length === 2 && parts[0] === '') {
    return mockPUT(parts[1], data);
  }
  return null;
};

export const mockDELETE_PATH = (path) => {
  const parts = path.split('/');
  if (parts.length === 2 && parts[0] === '') {
    return mockDELETE(parts[1]);
  }
  return null;
};

export default {
  mockGET,
  mockGET_PATH,
  mockPUT_PATH,
  mockDELETE_PATH
};

/**
 * Mock implementation for auth/login endpoint
 */

export const mockPOST = (data) => {
  // Check credentials
  const { email, password } = data;
  
  // Admin credentials
  if (email === 'admin@example.com' && password === 'admin123') {
    return {
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        isAdmin: true,
        avatar: null,
        createdAt: '2025-01-15T08:00:00.000Z',
        accountType: 'Premium'
      },
      tokens: {
        accessToken: 'mock-admin-access-token',
        refreshToken: 'mock-admin-refresh-token'
      }
    };
  }
  
  // Regular user credentials
  if (email && password && password.length >= 6) {
    return {
      user: {
        id: '2',
        name: 'Regular User',
        email: email,
        role: 'user',
        isAdmin: false,
        avatar: null,
        createdAt: '2025-02-20T10:30:00.000Z',
        accountType: 'Free'
      },
      tokens: {
        accessToken: 'mock-user-access-token',
        refreshToken: 'mock-user-refresh-token'
      }
    };
  }
  
  // Invalid credentials
  throw {
    response: {
      status: 401,
      data: {
        message: 'Invalid email or password'
      }
    }
  };
};

export default {
  mockPOST
};

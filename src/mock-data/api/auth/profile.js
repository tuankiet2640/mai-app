/**
 * Mock implementation for auth/profile endpoint
 */

// Mock user profiles
const mockProfiles = {
  'mock-admin-access-token': {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    isAdmin: true,
    avatar: null,
    createdAt: '2025-01-15T08:00:00.000Z',
    accountType: 'Premium',
    preferences: {
      theme: 'dark',
      notifications: true,
      language: 'en'
    },
    usage: {
      tokensUsed: 12500,
      requestsThisMonth: 145,
      lastActive: '2025-04-12T14:30:00.000Z'
    }
  },
  'mock-user-access-token': {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    isAdmin: false,
    avatar: null,
    createdAt: '2025-02-20T10:30:00.000Z',
    accountType: 'Free',
    preferences: {
      theme: 'light',
      notifications: false,
      language: 'en'
    },
    usage: {
      tokensUsed: 3200,
      requestsThisMonth: 28,
      lastActive: '2025-04-10T09:15:00.000Z'
    }
  }
};

export const mockGET = () => {
  // Get token from localStorage
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw {
      response: {
        status: 401,
        data: {
          message: 'Authentication required'
        }
      }
    };
  }
  
  // Return profile based on token
  const profile = mockProfiles[token];
  
  if (!profile) {
    throw {
      response: {
        status: 401,
        data: {
          message: 'Invalid token'
        }
      }
    };
  }
  
  return profile;
};

export const mockPUT = (data) => {
  // Get token from localStorage
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw {
      response: {
        status: 401,
        data: {
          message: 'Authentication required'
        }
      }
    };
  }
  
  // Get current profile
  const profile = mockProfiles[token];
  
  if (!profile) {
    throw {
      response: {
        status: 401,
        data: {
          message: 'Invalid token'
        }
      }
    };
  }
  
  // Update profile with new data
  const updatedProfile = {
    ...profile,
    ...data,
    // Don't allow changing these fields
    id: profile.id,
    role: profile.role,
    isAdmin: profile.isAdmin,
    accountType: profile.accountType,
    createdAt: profile.createdAt
  };
  
  // Update mock data
  mockProfiles[token] = updatedProfile;
  
  return updatedProfile;
};

export default {
  mockGET,
  mockPUT
};

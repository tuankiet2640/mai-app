import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './axios';

// Create context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// JWT token handling utility functions
const tokenUtils = {
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },
  
  getAccessToken: () => localStorage.getItem('accessToken'),
  
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  
  isTokenExpired: (token) => {
    if (!token) return true;
    
    try {
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Check if token is expired
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Initialize auth state from tokens
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const accessToken = tokenUtils.getAccessToken();
      const refreshToken = tokenUtils.getRefreshToken();
      
      if (!accessToken || !refreshToken) {
        setLoading(false);
        setAuthInitialized(true);
        return;
      }
      
      // Access token is expired, try to refresh
      if (tokenUtils.isTokenExpired(accessToken)) {
        const success = await refreshAccessToken();
        if (!success) {
          logout();
        } else {
          // Decode user info from fresh token
          await fetchUserProfile();
        }
      } else {
        // Valid token, load user data
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          await fetchUserProfile();
        }
      }
      
      setLoading(false);
      setAuthInitialized(true);
    };

    initializeAuth();
  }, []);

  // Refresh access token using refresh token
  const refreshAccessToken = async () => {
    const refreshToken = tokenUtils.getRefreshToken();
    
    if (!refreshToken) return false;
    
    try {
      // In real app, make API call to refresh token endpoint
      // For mock purposes, we'll simulate a token refresh
      
      // Mock API call
      // const response = await api.post('/auth/refresh', { refreshToken });
      
      // Simulate token refresh response
      const mockResponse = {
        data: {
          accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
            JSON.stringify({
              sub: '1234567890',
              name: user?.name || 'Admin User',
              email: user?.email || 'admin@example.com',
              isAdmin: user?.isAdmin || false,
              exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
            })
          )}.DUMMY_SIGNATURE`,
          refreshToken: refreshToken // Keep the same refresh token for demo
        }
      };
      
      const { accessToken, refreshToken: newRefreshToken } = mockResponse.data;
      tokenUtils.setTokens(accessToken, newRefreshToken);
      
      return accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return false;
    }
  };

  // Fetch user profile using access token
  const fetchUserProfile = async () => {
    try {
      // In a real app, make API call to fetch user data
      // For mock purposes, we'll simulate user data
      
      // Mock API call
      // const response = await api.get('/auth/profile');
      
      const accessToken = tokenUtils.getAccessToken();
      if (!accessToken) return false;
      
      // Decode user info from token
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const userData = {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          isAdmin: payload.isAdmin
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return false;
    }
  };

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      // In a real app, make API call to authenticate
      // const response = await api.post('/auth/login', credentials);
      
      // Simulate login response for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check mock credentials
      const isAdmin = credentials.email === 'admin@example.com' && credentials.password === 'admin123';
      const isValidUser = credentials.email.includes('@') && credentials.password?.length >= 6;
      
      if (!isValidUser) {
        throw new Error('Invalid credentials');
      }
      
      // Create JWT token with user data
      const mockResponse = {
        data: {
          user: {
            id: '1234567890',
            name: isAdmin ? 'Admin User' : 'Regular User',
            email: credentials.email,
            isAdmin: isAdmin
          },
          tokens: {
            accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
              JSON.stringify({
                sub: '1234567890',
                name: isAdmin ? 'Admin User' : 'Regular User',
                email: credentials.email,
                isAdmin: isAdmin,
                exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
              })
            )}.DUMMY_SIGNATURE`,
            refreshToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
              JSON.stringify({
                sub: '1234567890',
                exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days from now
              })
            )}.REFRESH_SIGNATURE`
          }
        }
      };
      
      const { user: userData, tokens } = mockResponse.data;
      
      // Save tokens to localStorage
      tokenUtils.setTokens(tokens.accessToken, tokens.refreshToken);
      
      // Update user state
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    // In a real app, you might want to call logout API to invalidate token
    // api.post('/auth/logout');
    
    setUser(null);
    tokenUtils.clearTokens();
  };

  const isAuthenticated = () => {
    return !!user && !!tokenUtils.getAccessToken() && !tokenUtils.isTokenExpired(tokenUtils.getAccessToken());
  };

  const isAdmin = () => {
    return user?.isAdmin === true && isAuthenticated();
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    authInitialized
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 
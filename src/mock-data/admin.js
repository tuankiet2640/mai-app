/**
 * Admin Mock Data
 * 
 * Mock data for admin-related API calls.
 */

// Mock dashboard statistics
export const dashboardStats = () => {
  return {
    userStats: {
      total: 1250,
      active: 980,
      new: 45,
      premium: 320
    },
    agentStats: {
      total: 18,
      active: 15,
      mostUsed: 'Research Assistant'
    },
    systemStats: {
      uptime: '99.8%',
      responseTime: '245ms',
      errorRate: '0.12%'
    },
    revenueStats: {
      monthly: '$12,450',
      annual: '$145,800',
      growth: '8.5%'
    }
  };
};

// Mock user activity data for admin dashboard
export const userActivity = () => {
  // Generate random activity data for the last 30 days
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });
  
  return {
    dates,
    signups: dates.map(() => Math.floor(Math.random() * 10) + 1),
    logins: dates.map(() => Math.floor(Math.random() * 100) + 50),
    activeUsers: dates.map(() => Math.floor(Math.random() * 500) + 700)
  };
};

// Mock system logs for admin view
export const systemLogs = (params = {}) => {
  const { page = 1, limit = 20 } = params;
  
  const logTypes = ['info', 'warning', 'error', 'critical'];
  const components = ['auth', 'api', 'database', 'frontend', 'agent'];
  
  // Generate random logs
  const logs = Array.from({ length: 100 }, (_, i) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - i * 30);
    
    return {
      id: `log-${i + 1}`,
      timestamp: date.toISOString(),
      type: logTypes[Math.floor(Math.random() * logTypes.length)],
      component: components[Math.floor(Math.random() * components.length)],
      message: `System ${logTypes[Math.floor(Math.random() * logTypes.length)]} in ${components[Math.floor(Math.random() * components.length)]} component`,
      details: `Details for log ${i + 1}`
    };
  });
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedLogs = logs.slice(startIndex, endIndex);
  
  return {
    logs: paginatedLogs,
    pagination: {
      total: logs.length,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(logs.length / limit)
    }
  };
};

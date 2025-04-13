/**
 * Mock implementation for admin/dashboard/stats endpoint
 */

export const mockGET = (params = {}) => {
  // Default time range is 'week' if not specified
  const timeRange = params.timeRange || 'week';
  
  // Different stats based on time range
  const statsMap = {
    day: {
      activeUsers: 42,
      newUsers: 8,
      totalRequests: 1256,
      averageResponseTime: 320,
      tokenUsage: 125600,
      errorRate: 0.8,
      serviceUptime: 99.98,
      topAgents: [
        { id: 'claude', name: 'Claude', requests: 520, tokens: 62400 },
        { id: 'gpt', name: 'GPT', requests: 430, tokens: 51600 },
        { id: 'custom', name: 'Custom Agents', requests: 306, tokens: 11600 }
      ],
      topServices: [
        { id: 'chat', name: 'Chat', requests: 780, tokens: 93600 },
        { id: 'code', name: 'Code', requests: 320, tokens: 25600 },
        { id: 'images', name: 'Images', requests: 156, tokens: 6400 }
      ],
      recentActivity: [
        { id: 'act1', type: 'user_login', user: 'admin@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
        { id: 'act2', type: 'api_request', user: 'user@example.com', service: 'chat', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
        { id: 'act3', type: 'agent_created', user: 'developer@example.com', agent: 'Custom GPT', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() }
      ]
    },
    week: {
      activeUsers: 156,
      newUsers: 23,
      totalRequests: 8750,
      averageResponseTime: 340,
      tokenUsage: 875000,
      errorRate: 1.2,
      serviceUptime: 99.95,
      topAgents: [
        { id: 'claude', name: 'Claude', requests: 3650, tokens: 438000 },
        { id: 'gpt', name: 'GPT', requests: 3010, tokens: 361200 },
        { id: 'custom', name: 'Custom Agents', requests: 2090, tokens: 75800 }
      ],
      topServices: [
        { id: 'chat', name: 'Chat', requests: 5425, tokens: 651000 },
        { id: 'code', name: 'Code', requests: 2275, tokens: 182000 },
        { id: 'images', name: 'Images', requests: 1050, tokens: 42000 }
      ],
      recentActivity: [
        { id: 'act1', type: 'user_login', user: 'admin@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
        { id: 'act2', type: 'api_request', user: 'user@example.com', service: 'chat', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
        { id: 'act3', type: 'agent_created', user: 'developer@example.com', agent: 'Custom GPT', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
        { id: 'act4', type: 'service_error', service: 'images', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
        { id: 'act5', type: 'user_registered', user: 'newuser@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() }
      ]
    },
    month: {
      activeUsers: 520,
      newUsers: 85,
      totalRequests: 35000,
      averageResponseTime: 350,
      tokenUsage: 3500000,
      errorRate: 1.5,
      serviceUptime: 99.92,
      topAgents: [
        { id: 'claude', name: 'Claude', requests: 14700, tokens: 1764000 },
        { id: 'gpt', name: 'GPT', requests: 12250, tokens: 1470000 },
        { id: 'custom', name: 'Custom Agents', requests: 8050, tokens: 266000 }
      ],
      topServices: [
        { id: 'chat', name: 'Chat', requests: 21700, tokens: 2604000 },
        { id: 'code', name: 'Code', requests: 9100, tokens: 728000 },
        { id: 'images', name: 'Images', requests: 4200, tokens: 168000 }
      ],
      recentActivity: [
        { id: 'act1', type: 'user_login', user: 'admin@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
        { id: 'act2', type: 'api_request', user: 'user@example.com', service: 'chat', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
        { id: 'act3', type: 'agent_created', user: 'developer@example.com', agent: 'Custom GPT', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
        { id: 'act4', type: 'service_error', service: 'images', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
        { id: 'act5', type: 'user_registered', user: 'newuser@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
        { id: 'act6', type: 'system_update', version: '1.2.0', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() },
        { id: 'act7', type: 'api_key_created', user: 'developer@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString() }
      ]
    }
  };
  
  // Return stats for the requested time range
  return statsMap[timeRange] || statsMap.week;
};

export default {
  mockGET
};

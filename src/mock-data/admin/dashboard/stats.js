/**
 * Admin Dashboard Stats Mock Data
 * 
 * Mock data for admin dashboard statistics.
 */

// Generate mock dashboard stats
export default {
  users: 342,
  agents: 48,
  services: 12,
  apiCalls: 5843,
  averageResponseTime: 1.8,
  tokenUsage: {
    total: 12584629,
    available: 5000000,
    used: 7584629,
    byModel: [
      { name: 'GPT-4', usage: 3245789, color: '#8884d8' },
      { name: 'Claude-3', usage: 2654321, color: '#82ca9d' },
      { name: 'Mistral', usage: 952461, color: '#ffc658' },
      { name: 'Llama', usage: 732058, color: '#ff8042' }
    ]
  },
  crushEncounters: [
    { week: 'Week 1', count: 2 },
    { week: 'Week 2', count: 1 },
    { week: 'Week 3', count: 3 },
    { week: 'Week 4', count: 0 },
    { week: 'Week 5', count: 4 },
    { week: 'Week 6', count: 2 },
  ],
  userGrowth: [
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 150 },
    { month: 'Mar', count: 200 },
    { month: 'Apr', count: 250 },
    { month: 'May', count: 300 },
    { month: 'Jun', count: 342 },
  ],
  popularAgents: [
    { name: 'Minion', usage: 456, avgTokens: 1250 },
    { name: 'Claude', usage: 322, avgTokens: 1850 },
    { name: 'GPT', usage: 287, avgTokens: 1640 },
    { name: 'Custom', usage: 224, avgTokens: 950 },
  ],
  servicePerformance: [
    { name: 'Task Management', requests: 2145, avgLatency: 220, errorRate: 1.2 },
    { name: 'Content Creation', requests: 1856, avgLatency: 350, errorRate: 0.8 },
    { name: 'Research Assistant', requests: 1542, avgLatency: 420, errorRate: 1.5 },
    { name: 'Code Helper', requests: 1320, avgLatency: 280, errorRate: 1.1 },
    { name: 'Meeting Summarizer', requests: 980, avgLatency: 190, errorRate: 0.5 },
  ],
  dailyTokenUsage: [
    { date: '06/01', usage: 425000 },
    { date: '06/02', usage: 392000 },
    { date: '06/03', usage: 510000 },
    { date: '06/04', usage: 380000 },
    { date: '06/05', usage: 405000 },
    { date: '06/06', usage: 425000 },
    { date: '06/07', usage: 460000 },
  ],
  userData: {
    active: 298,
    inactive: 44,
    new: {
      daily: 8,
      weekly: 42,
      monthly: 124
    },
    byPlan: [
      { name: 'Bellow Basic', count: 184, color: '#8884d8' },
      { name: 'Basic', count: 87, color: '#82ca9d' },
      { name: 'Pro', count: 59, color: '#ffc658' },
      { name: 'Provip', count: 12, color: '#ff8042' }
    ],
    topUsers: [
      { id: 'U1001', name: 'Alice Johnson', email: 'alice@example.com', tokenUsage: 450000, lastActive: '2023-06-07T14:32:21' },
      { id: 'U1002', name: 'Bob Smith', email: 'bob@example.com', tokenUsage: 380500, lastActive: '2023-06-07T09:15:43' },
      { id: 'U1003', name: 'Carol Davis', email: 'carol@example.com', tokenUsage: 325800, lastActive: '2023-06-06T18:22:10' },
      { id: 'U1004', name: 'David Wilson', email: 'david@example.com', tokenUsage: 290450, lastActive: '2023-06-07T11:45:32' },
      { id: 'U1005', name: 'Eva Brown', email: 'eva@example.com', tokenUsage: 275900, lastActive: '2023-06-07T16:08:55' }
    ]
  },
  agentData: {
    types: [
      { type: 'Assistant', count: 18, color: '#8884d8' },
      { type: 'Specialist', count: 14, color: '#82ca9d' },
      { type: 'Workflow', count: 9, color: '#ffc658' },
      { type: 'Custom', count: 7, color: '#ff8042' }
    ],
    models: [
      { name: 'GPT-4', count: 22, avgLatency: 850 },
      { name: 'Claude-3', count: 15, avgLatency: 920 },
      { name: 'Mistral', count: 8, avgLatency: 540 },
      { name: 'Llama', count: 3, avgLatency: 780 }
    ],
    recentAgents: [
      { id: 'A1001', name: 'Research Assistant', type: 'Specialist', model: 'GPT-4', creator: 'System', created: '2023-05-28', uses: 456 },
      { id: 'A1002', name: 'Content Writer', type: 'Assistant', model: 'Claude-3', creator: 'Alice Johnson', created: '2023-06-02', uses: 322 },
      { id: 'A1003', name: 'Code Helper', type: 'Specialist', model: 'GPT-4', creator: 'System', created: '2023-05-15', uses: 287 },
      { id: 'A1004', name: 'Meeting Summarizer', type: 'Workflow', model: 'Claude-3', creator: 'Bob Smith', created: '2023-06-05', uses: 156 },
      { id: 'A1005', name: 'Custom Assistant', type: 'Custom', model: 'GPT-4', creator: 'Bob Smith', created: '2023-06-05', uses: 67 }
    ]
  },
  serviceData: {
    status: [
      { status: 'Operational', count: 10, color: '#4ade80' },
      { status: 'Degraded', count: 2, color: '#facc15' },
      { status: 'Down', count: 0, color: '#f87171' }
    ],
    uptime: [
      { service: 'Task Management', uptime: 99.8 },
      { service: 'Content Creation', uptime: 99.5 },
      { service: 'Research Assistant', uptime: 99.9 },
      { service: 'Code Helper', uptime: 99.7 },
      { service: 'Meeting Summarizer', uptime: 100.0 }
    ],
    incidents: [
      { id: 'INC1001', service: 'Content Creation', startTime: '2023-06-05T14:22:10', endTime: '2023-06-05T16:45:32', impact: 'Minor', status: 'Resolved' },
      { id: 'INC1002', service: 'Code Helper', startTime: '2023-06-06T09:10:15', endTime: '2023-06-06T10:30:45', impact: 'Minor', status: 'Resolved' },
      { id: 'INC1003', service: 'Task Management', startTime: '2023-06-07T08:10:22', endTime: null, impact: 'Minor', status: 'Investigating' }
    ]
  },
  settingsData: {
    tokenLimits: {
      default: 100000,
      basic: 500000,
      pro: 2000000,
      enterprise: 10000000
    },
    modelSettings: [
      { model: 'GPT-4', enabled: true, defaultContextSize: 8000, maxContextSize: 32000 },
      { model: 'Claude-3', enabled: true, defaultContextSize: 100000, maxContextSize: 200000 },
      { model: 'Mistral', enabled: true, defaultContextSize: 4000, maxContextSize: 8000 },
      { model: 'Llama', enabled: true, defaultContextSize: 4000, maxContextSize: 8000 }
    ],
    integrations: [
      { name: 'Slack', status: 'Connected', lastSync: '2023-06-07T12:30:45' },
      { name: 'Google Drive', status: 'Connected', lastSync: '2023-06-06T18:45:10' },
      { name: 'GitHub', status: 'Disconnected', lastSync: '2023-06-01T14:20:38' },
      { name: 'Jira', status: 'Connected', lastSync: '2023-06-07T10:05:17' }
    ]
  }
};

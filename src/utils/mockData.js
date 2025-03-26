// Mock data for admin dashboard
export const dashboardStats = {
  users: 342,
  activeUsers: 286,
  totalTokensUsed: 12345678,
  availableTokens: 8765432,
  apiCalls: 5843,
  averageResponseTime: 1.8, // seconds
  userGrowth: [
    { month: 'Jan', users: 210 },
    { month: 'Feb', users: 240 },
    { month: 'Mar', users: 262 },
    { month: 'Apr', users: 290 },
    { month: 'May', users: 310 },
    { month: 'Jun', users: 342 }
  ],
  crushEncounters: [
    { week: 'Week 1', count: 3 },
    { week: 'Week 2', count: 1 },
    { week: 'Week 3', count: 4 },
    { week: 'Week 4', count: 2 },
    { week: 'Week 5', count: 5 },
    { week: 'Week 6', count: 3 }
  ]
};

// Agent usage statistics
export const agentStats = [
  {
    id: 1,
    name: 'Minion',
    usage: 2345,
    share: 45,
    trend: 'up',
    description: 'Task management and automation agent',
    status: 'active',
    tokens: {
      consumed: 1892450,
      allocated: 5000000
    }
  },
  {
    id: 2,
    name: 'Researcher',
    usage: 1421,
    share: 28,
    trend: 'up',
    description: 'Data gathering and analysis agent',
    status: 'active',
    tokens: {
      consumed: 3102340,
      allocated: 4000000
    }
  },
  {
    id: 3,
    name: 'Coder',
    usage: 876,
    share: 17,
    trend: 'down',
    description: 'Code generation and review agent',
    status: 'active',
    tokens: {
      consumed: 5467890,
      allocated: 8000000
    }
  },
  {
    id: 4,
    name: 'Writer',
    usage: 523,
    share: 10,
    trend: 'stable',
    description: 'Content creation and editing agent',
    status: 'maintenance',
    tokens: {
      consumed: 1892980,
      allocated: 3000000
    }
  }
];

// Service usage statistics
export const serviceStats = [
  {
    id: 1,
    name: 'OpenAI GPT-4',
    requests: 4521,
    tokensUsed: 5874320,
    tokensAvailable: 10000000,
    cost: 1123.45,
    status: 'operational'
  },
  {
    id: 2,
    name: 'Anthropic Claude',
    requests: 2874,
    tokensUsed: 3541980,
    tokensAvailable: 8000000,
    cost: 892.68,
    status: 'operational'
  },
  {
    id: 3,
    name: 'Google Gemini',
    requests: 1235,
    tokensUsed: 1852360,
    tokensAvailable: 5000000,
    cost: 534.12,
    status: 'degraded'
  },
  {
    id: 4,
    name: 'Local Mistral',
    requests: 3562,
    tokensUsed: 2547890,
    tokensAvailable: 'Unlimited',
    cost: 0,
    status: 'operational'
  }
];

// Token usage history by day
export const tokenUsageHistory = [
  { date: '2023-06-01', tokens: 354120 },
  { date: '2023-06-02', tokens: 421560 },
  { date: '2023-06-03', tokens: 385470 },
  { date: '2023-06-04', tokens: 297840 },
  { date: '2023-06-05', tokens: 312650 },
  { date: '2023-06-06', tokens: 342890 },
  { date: '2023-06-07', tokens: 385210 },
  { date: '2023-06-08', tokens: 421360 },
  { date: '2023-06-09', tokens: 452780 },
  { date: '2023-06-10', tokens: 387450 },
  { date: '2023-06-11', tokens: 312870 },
  { date: '2023-06-12', tokens: 345670 },
  { date: '2023-06-13', tokens: 378920 },
  { date: '2023-06-14', tokens: 412540 }
];

// Token distribution by model
export const tokenDistribution = [
  { name: 'GPT-4', value: 45 },
  { name: 'Claude', value: 30 },
  { name: 'Gemini', value: 15 },
  { name: 'Mistral', value: 10 }
];

// API response times in milliseconds
export const apiResponseTimes = [
  { time: '8:00 AM', gpt4: 850, claude: 920, gemini: 780, mistral: 120 },
  { time: '10:00 AM', gpt4: 920, claude: 1050, gemini: 810, mistral: 150 },
  { time: '12:00 PM', gpt4: 1100, claude: 1200, gemini: 950, mistral: 200 },
  { time: '2:00 PM', gpt4: 1050, claude: 1150, gemini: 900, mistral: 180 },
  { time: '4:00 PM', gpt4: 980, claude: 1100, gemini: 850, mistral: 160 },
  { time: '6:00 PM', gpt4: 900, claude: 980, gemini: 800, mistral: 140 }
];

// User activity by hour
export const userActivity = [
  { hour: '0', users: 12 },
  { hour: '1', users: 8 },
  { hour: '2', users: 5 },
  { hour: '3', users: 3 },
  { hour: '4', users: 2 },
  { hour: '5', users: 4 },
  { hour: '6', users: 7 },
  { hour: '7', users: 15 },
  { hour: '8', users: 32 },
  { hour: '9', users: 56 },
  { hour: '10', users: 68 },
  { hour: '11', users: 74 },
  { hour: '12', users: 78 },
  { hour: '13', users: 71 },
  { hour: '14', users: 65 },
  { hour: '15', users: 58 },
  { hour: '16', users: 51 },
  { hour: '17', users: 46 },
  { hour: '18', users: 39 },
  { hour: '19', users: 35 },
  { hour: '20', users: 29 },
  { hour: '21', users: 24 },
  { hour: '22', users: 18 },
  { hour: '23', users: 14 }
];

// Token top-up packages
export const tokenPackages = [
  {
    id: 1,
    name: 'Starter',
    tokens: 1000000,
    price: 20,
    description: 'Basic package for individuals or small teams'
  },
  {
    id: 2,
    name: 'Professional',
    tokens: 5000000,
    price: 80,
    description: 'Ideal for professional teams with moderate usage'
  },
  {
    id: 3,
    name: 'Enterprise',
    tokens: 20000000,
    price: 250,
    description: 'For large organizations with high volume needs'
  },
  {
    id: 4,
    name: 'Custom',
    tokens: 'Custom',
    price: 'Contact sales',
    description: 'Tailored solutions for specific requirements'
  }
]; 
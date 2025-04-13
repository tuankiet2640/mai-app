/**
 * Analytics Mock Data
 * 
 * Mock data for analytics and monitoring features.
 */

// Generate mock system metrics
const generateSystemMetrics = (days = 30) => {
  const metrics = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Generate random metrics with some patterns
    const requestCount = Math.floor(Math.random() * 1000) + 500 + (Math.sin(i/7) * 300);
    const avgResponseTime = Math.floor(Math.random() * 200) + 300 + (Math.cos(i/10) * 50);
    const errorRate = (Math.random() * 0.8) + 0.1;
    const tokenUsage = requestCount * (Math.floor(Math.random() * 200) + 100);
    
    metrics.push({
      date: date.toISOString().split('T')[0],
      metrics: {
        request_count: Math.max(100, Math.round(requestCount)),
        avg_response_time_ms: Math.max(100, Math.round(avgResponseTime)),
        error_rate_percent: parseFloat(errorRate.toFixed(2)),
        token_usage: Math.max(10000, Math.round(tokenUsage)),
        active_users: Math.floor(Math.random() * 100) + 50,
        concurrent_sessions: Math.floor(Math.random() * 50) + 10
      }
    });
  }
  
  return metrics;
};

// Generate mock model usage data
const generateModelUsage = (days = 30) => {
  const models = ['gpt-4', 'claude-3-opus', 'claude-3-sonnet', 'gpt-3.5-turbo', 'llama-3-70b'];
  const modelData = models.map(model => ({
    model_id: model,
    total_tokens: 0,
    total_requests: 0,
    avg_tokens_per_request: 0,
    usage_by_day: []
  }));
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    // Generate data for each model
    models.forEach((model, idx) => {
      const requests = Math.floor(Math.random() * 200) + 50;
      const tokensPerRequest = Math.floor(Math.random() * 1000) + 500;
      const tokens = requests * tokensPerRequest;
      
      modelData[idx].usage_by_day.push({
        date: dateString,
        requests,
        tokens
      });
      
      // Update totals
      modelData[idx].total_tokens += tokens;
      modelData[idx].total_requests += requests;
    });
  }
  
  // Calculate averages
  modelData.forEach(model => {
    model.avg_tokens_per_request = Math.round(model.total_tokens / model.total_requests);
  });
  
  return modelData;
};

// Generate mock knowledge base usage
const generateKnowledgeBaseUsage = (days = 30) => {
  const kbs = ['kb-1', 'kb-2', 'kb-3', 'kb-4', 'kb-5'];
  const kbData = kbs.map(kb => ({
    kb_id: kb,
    total_queries: 0,
    total_retrievals: 0,
    relevance_score: 0,
    usage_by_day: []
  }));
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    // Generate data for each knowledge base
    kbs.forEach((kb, idx) => {
      const queries = Math.floor(Math.random() * 100) + 20;
      const retrievalsPerQuery = Math.random() * 3 + 1;
      const retrievals = Math.round(queries * retrievalsPerQuery);
      const relevance = Math.random() * 0.3 + 0.7;
      
      kbData[idx].usage_by_day.push({
        date: dateString,
        queries,
        retrievals,
        relevance: parseFloat(relevance.toFixed(2))
      });
      
      // Update totals
      kbData[idx].total_queries += queries;
      kbData[idx].total_retrievals += retrievals;
    });
  }
  
  // Calculate averages
  kbData.forEach(kb => {
    const totalRelevance = kb.usage_by_day.reduce((sum, day) => sum + day.relevance, 0);
    kb.relevance_score = parseFloat((totalRelevance / kb.usage_by_day.length).toFixed(2));
  });
  
  return kbData;
};

// Generate mock user activity data
const generateUserActivity = (days = 30) => {
  const activity = {
    new_users: [],
    active_users: [],
    user_engagement: []
  };
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    // New users (with slight growth trend)
    const newUsers = Math.floor(Math.random() * 10) + 3 + (i / 10);
    
    // Active users (more on weekdays)
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const activeUsers = Math.floor(Math.random() * 30) + 50 - (isWeekend ? 20 : 0);
    
    // Engagement metrics
    const avgSessionsPerUser = Math.random() * 2 + 1;
    const avgQueriesPerSession = Math.random() * 5 + 2;
    const avgSessionDurationMinutes = Math.random() * 10 + 5;
    
    activity.new_users.push({
      date: dateString,
      count: Math.round(newUsers)
    });
    
    activity.active_users.push({
      date: dateString,
      count: Math.round(activeUsers)
    });
    
    activity.user_engagement.push({
      date: dateString,
      avg_sessions_per_user: parseFloat(avgSessionsPerUser.toFixed(1)),
      avg_queries_per_session: parseFloat(avgQueriesPerSession.toFixed(1)),
      avg_session_duration_minutes: parseFloat(avgSessionDurationMinutes.toFixed(1))
    });
  }
  
  return activity;
};

// Generate mock system logs
const generateSystemLogs = (count = 100) => {
  const logLevels = ['INFO', 'WARNING', 'ERROR', 'CRITICAL'];
  const services = ['api-gateway', 'auth-service', 'rag-service', 'kb-service', 'conversation-service'];
  const logTypes = [
    'Request processed',
    'Authentication attempt',
    'Rate limit reached',
    'Database operation',
    'Model inference',
    'Document indexing',
    'Knowledge retrieval',
    'System maintenance',
    'Configuration change',
    'Exception occurred'
  ];
  
  const logs = [];
  const endDate = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(endDate);
    date.setMinutes(date.getMinutes() - i * 10);
    
    const level = logLevels[Math.floor(Math.random() * logLevels.length)];
    const service = services[Math.floor(Math.random() * services.length)];
    const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
    
    // Make errors and critical logs less common
    if ((level === 'ERROR' || level === 'CRITICAL') && Math.random() > 0.2) {
      continue;
    }
    
    logs.push({
      id: `log-${i}`,
      timestamp: date.toISOString(),
      level,
      service,
      message: `${logType} ${level === 'ERROR' || level === 'CRITICAL' ? 'failed' : 'succeeded'} in ${service}`,
      details: level === 'ERROR' || level === 'CRITICAL' 
        ? `Error details: ${Math.random().toString(36).substring(2, 15)}`
        : null
    });
  }
  
  // Sort by timestamp (newest first)
  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return logs;
};

// Create mock data
const systemMetrics = generateSystemMetrics();
const modelUsage = generateModelUsage();
const knowledgeBaseUsage = generateKnowledgeBaseUsage();
const userActivity = generateUserActivity();
const systemLogs = generateSystemLogs();

/**
 * Get system metrics
 * @param {object} params - Query parameters
 * @returns {object} System metrics
 */
export const getSystemMetrics = (params = {}) => {
  const { days = 30 } = params;
  
  // Filter by days
  const filteredMetrics = systemMetrics.slice(-days);
  
  return {
    days,
    metrics: filteredMetrics
  };
};

/**
 * Get model usage statistics
 * @param {object} params - Query parameters
 * @returns {object} Model usage statistics
 */
export const getModelUsage = (params = {}) => {
  const { days = 30, model_id = null } = params;
  
  let filteredModels = [...modelUsage];
  
  // Filter by model ID if specified
  if (model_id) {
    filteredModels = filteredModels.filter(model => model.model_id === model_id);
  }
  
  // Filter by days for each model
  filteredModels = filteredModels.map(model => ({
    ...model,
    usage_by_day: model.usage_by_day.slice(-days)
  }));
  
  return {
    days,
    models: filteredModels
  };
};

/**
 * Get knowledge base usage statistics
 * @param {object} params - Query parameters
 * @returns {object} Knowledge base usage statistics
 */
export const getKnowledgeBaseUsage = (params = {}) => {
  const { days = 30, kb_id = null } = params;
  
  let filteredKBs = [...knowledgeBaseUsage];
  
  // Filter by knowledge base ID if specified
  if (kb_id) {
    filteredKBs = filteredKBs.filter(kb => kb.kb_id === kb_id);
  }
  
  // Filter by days for each knowledge base
  filteredKBs = filteredKBs.map(kb => ({
    ...kb,
    usage_by_day: kb.usage_by_day.slice(-days)
  }));
  
  return {
    days,
    knowledge_bases: filteredKBs
  };
};

/**
 * Get user activity statistics
 * @param {object} params - Query parameters
 * @returns {object} User activity statistics
 */
export const getUserActivity = (params = {}) => {
  const { days = 30 } = params;
  
  // Filter by days
  const filteredActivity = {
    new_users: userActivity.new_users.slice(-days),
    active_users: userActivity.active_users.slice(-days),
    user_engagement: userActivity.user_engagement.slice(-days)
  };
  
  return {
    days,
    activity: filteredActivity
  };
};

/**
 * Get system logs
 * @param {object} params - Query parameters
 * @returns {object} System logs
 */
export const getSystemLogs = (params = {}) => {
  const { page = 1, limit = 20, level = null, service = null } = params;
  
  // Filter logs
  let filteredLogs = [...systemLogs];
  
  if (level) {
    filteredLogs = filteredLogs.filter(log => log.level === level);
  }
  
  if (service) {
    filteredLogs = filteredLogs.filter(log => log.service === service);
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
  
  return {
    logs: paginatedLogs,
    pagination: {
      total: filteredLogs.length,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      pages: Math.ceil(filteredLogs.length / limit)
    }
  };
};

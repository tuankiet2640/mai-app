/**
 * Agents Mock Data
 * 
 * Mock data for AI agent-related API calls.
 */

// List of available agent types
const agentTypes = [
  {
    id: 'research',
    name: 'Research Assistant',
    description: 'Helps with research tasks, finding information, and summarizing content.',
    icon: 'search',
    capabilities: ['Web search', 'Document analysis', 'Summarization'],
    availableModels: ['gpt-4', 'claude-3']
  },
  {
    id: 'writing',
    name: 'Writing Assistant',
    description: 'Assists with writing, editing, and improving text content.',
    icon: 'edit',
    capabilities: ['Content creation', 'Grammar checking', 'Style suggestions'],
    availableModels: ['gpt-4', 'claude-3', 'llama-3']
  },
  {
    id: 'coding',
    name: 'Code Assistant',
    description: 'Helps with programming tasks, debugging, and code optimization.',
    icon: 'code',
    capabilities: ['Code generation', 'Debugging', 'Code review'],
    availableModels: ['gpt-4', 'claude-3', 'codellama']
  },
  {
    id: 'learning',
    name: 'Learning Assistant',
    description: 'Helps with learning new subjects, concepts, and skills.',
    icon: 'school',
    capabilities: ['Concept explanation', 'Practice exercises', 'Learning paths'],
    availableModels: ['gpt-4', 'claude-3']
  }
];

// User's agent instances
const userAgents = [
  {
    id: 'agent-1',
    name: 'My Research Helper',
    typeId: 'research',
    model: 'gpt-4',
    createdAt: '2025-03-15T10:30:00.000Z',
    lastUsed: '2025-04-12T08:45:00.000Z',
    customInstructions: 'Focus on academic sources and scientific papers.',
    conversations: 12
  },
  {
    id: 'agent-2',
    name: 'Code Buddy',
    typeId: 'coding',
    model: 'claude-3',
    createdAt: '2025-03-20T14:15:00.000Z',
    lastUsed: '2025-04-11T16:20:00.000Z',
    customInstructions: 'Prefer JavaScript and React examples.',
    conversations: 8
  },
  {
    id: 'agent-3',
    name: 'Essay Writer',
    typeId: 'writing',
    model: 'gpt-4',
    createdAt: '2025-04-01T09:00:00.000Z',
    lastUsed: '2025-04-10T11:30:00.000Z',
    customInstructions: 'Academic writing style with proper citations.',
    conversations: 5
  }
];

/**
 * Get all available agent types
 * @returns {Array} List of agent types
 */
export const getAgentTypes = () => {
  return agentTypes;
};

/**
 * Get agent type by ID
 * @param {string} typeId - Agent type ID
 * @returns {object} Agent type details
 */
export const getAgentTypeById = (typeId) => {
  const agentType = agentTypes.find(type => type.id === typeId);
  
  if (!agentType) {
    throw new Error('Agent type not found');
  }
  
  return agentType;
};

/**
 * Get user's agents
 * @returns {Array} List of user's agents
 */
export const getUserAgents = () => {
  return userAgents;
};

/**
 * Get user agent by ID
 * @param {string} agentId - Agent ID
 * @returns {object} Agent details
 */
export const getUserAgentById = (agentId) => {
  const agent = userAgents.find(a => a.id === agentId);
  
  if (!agent) {
    throw new Error('Agent not found');
  }
  
  // Enhance with type details
  const agentType = agentTypes.find(type => type.id === agent.typeId);
  
  return {
    ...agent,
    type: agentType
  };
};

/**
 * Create a new agent for the user
 * @param {object} agentData - Agent data
 * @returns {object} Created agent
 */
export const createUserAgent = (agentData) => {
  // Validate agent type
  const agentType = agentTypes.find(type => type.id === agentData.typeId);
  if (!agentType) {
    throw new Error('Invalid agent type');
  }
  
  // Create new agent
  const newAgent = {
    id: `agent-${userAgents.length + 1}`,
    createdAt: new Date().toISOString(),
    lastUsed: null,
    conversations: 0,
    ...agentData
  };
  
  // Add to user agents
  userAgents.push(newAgent);
  
  return {
    ...newAgent,
    type: agentType
  };
};

/**
 * Update user agent
 * @param {string} agentId - Agent ID
 * @param {object} agentData - Updated agent data
 * @returns {object} Updated agent
 */
export const updateUserAgent = (agentId, agentData) => {
  const agentIndex = userAgents.findIndex(a => a.id === agentId);
  
  if (agentIndex === -1) {
    throw new Error('Agent not found');
  }
  
  // Update agent
  userAgents[agentIndex] = {
    ...userAgents[agentIndex],
    ...agentData,
    // Protect these fields
    id: userAgents[agentIndex].id,
    createdAt: userAgents[agentIndex].createdAt
  };
  
  // Enhance with type details
  const agentType = agentTypes.find(type => type.id === userAgents[agentIndex].typeId);
  
  return {
    ...userAgents[agentIndex],
    type: agentType
  };
};

/**
 * Delete user agent
 * @param {string} agentId - Agent ID
 * @returns {boolean} Success status
 */
export const deleteUserAgent = (agentId) => {
  const agentIndex = userAgents.findIndex(a => a.id === agentId);
  
  if (agentIndex === -1) {
    throw new Error('Agent not found');
  }
  
  // Remove agent
  userAgents.splice(agentIndex, 1);
  
  return true;
};

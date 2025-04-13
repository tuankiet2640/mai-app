/**
 * Chat Mock Data
 * 
 * Mock data for chat-related API calls.
 */

// Generate mock conversations
const generateMockConversations = (count = 5) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `conv-${i + 1}`,
    title: `Conversation ${i + 1}`,
    agentId: i % 3 === 0 ? 'agent-1' : i % 3 === 1 ? 'agent-2' : 'agent-3',
    createdAt: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - (count - i) * 12 * 60 * 60 * 1000).toISOString(),
    messageCount: Math.floor(Math.random() * 20) + 5
  }));
};

// Mock conversations
const mockConversations = generateMockConversations();

// Generate mock messages for a conversation
const generateMockMessages = (conversationId, count = 10) => {
  const messages = [];
  let timestamp = new Date(Date.now() - count * 5 * 60 * 1000);
  
  for (let i = 0; i < count; i++) {
    // Alternate between user and assistant messages
    const role = i % 2 === 0 ? 'user' : 'assistant';
    
    // Create message
    messages.push({
      id: `msg-${conversationId}-${i + 1}`,
      conversationId,
      role,
      content: role === 'user' 
        ? `This is user message ${i/2 + 1} in conversation ${conversationId}`
        : `This is assistant response ${Math.floor(i/2) + 1} in conversation ${conversationId}. I'm here to help you with your questions.`,
      timestamp: new Date(timestamp.getTime() + i * 5 * 60 * 1000).toISOString()
    });
  }
  
  return messages;
};

// Mock messages for each conversation
const mockMessages = {};
mockConversations.forEach(conv => {
  mockMessages[conv.id] = generateMockMessages(conv.id, conv.messageCount);
});

/**
 * Get user's conversations
 * @param {object} params - Query parameters
 * @returns {Array} List of conversations
 */
export const getConversations = (params = {}) => {
  const { agentId } = params;
  
  // Filter by agent if specified
  let filteredConversations = [...mockConversations];
  if (agentId) {
    filteredConversations = filteredConversations.filter(conv => conv.agentId === agentId);
  }
  
  // Sort by updated time (newest first)
  filteredConversations.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
  return filteredConversations;
};

/**
 * Get conversation by ID
 * @param {string} conversationId - Conversation ID
 * @returns {object} Conversation details
 */
export const getConversationById = (conversationId) => {
  const conversation = mockConversations.find(conv => conv.id === conversationId);
  
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  
  return conversation;
};

/**
 * Get messages for a conversation
 * @param {string} conversationId - Conversation ID
 * @returns {Array} List of messages
 */
export const getConversationMessages = (conversationId) => {
  const messages = mockMessages[conversationId];
  
  if (!messages) {
    throw new Error('Conversation not found');
  }
  
  return messages;
};

/**
 * Create a new conversation
 * @param {object} conversationData - Conversation data
 * @returns {object} Created conversation
 */
export const createConversation = (conversationData) => {
  // Create new conversation
  const newConversation = {
    id: `conv-${mockConversations.length + 1}`,
    title: conversationData.title || `New Conversation ${mockConversations.length + 1}`,
    agentId: conversationData.agentId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messageCount: 0
  };
  
  // Add to conversations
  mockConversations.push(newConversation);
  
  // Initialize empty messages array
  mockMessages[newConversation.id] = [];
  
  return newConversation;
};

/**
 * Send a message in a conversation
 * @param {string} conversationId - Conversation ID
 * @param {object} messageData - Message data
 * @returns {object} Created message and assistant response
 */
export const sendMessage = (conversationId, messageData) => {
  const conversation = mockConversations.find(conv => conv.id === conversationId);
  
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  
  // Get messages for this conversation
  const messages = mockMessages[conversationId] || [];
  
  // Create user message
  const userMessage = {
    id: `msg-${conversationId}-${messages.length + 1}`,
    conversationId,
    role: 'user',
    content: messageData.content,
    timestamp: new Date().toISOString()
  };
  
  // Add user message
  messages.push(userMessage);
  
  // Create assistant response (simulated)
  const assistantMessage = {
    id: `msg-${conversationId}-${messages.length + 1}`,
    conversationId,
    role: 'assistant',
    content: `This is a mock response to: "${messageData.content}"`,
    timestamp: new Date(Date.now() + 1000).toISOString()
  };
  
  // Add assistant message
  messages.push(assistantMessage);
  
  // Update conversation
  conversation.messageCount = messages.length;
  conversation.updatedAt = new Date().toISOString();
  
  // Update messages
  mockMessages[conversationId] = messages;
  
  return {
    userMessage,
    assistantMessage
  };
};

import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectConversations = state => state.conversations.items;
export const selectActiveConversation = state => state.conversations.activeConversation;
export const selectSearchQuery = state => state.conversations.searchQuery;
export const selectConversationsStatus = state => state.conversations.status;
export const selectConversationsError = state => state.conversations.error;

// Model selectors
export const selectAvailableModels = state => state.model?.availableModels;
export const selectSelectedModel = state => state.model?.selectedModel;

// Computed selectors
export const selectFilteredConversations = createSelector(
  [selectConversations, selectSearchQuery],
  (conversations, searchQuery) => {
    if (!searchQuery) {
      return conversations;
    }
    
    const query = searchQuery.toLowerCase();
    return conversations.filter(
      conversation => 
        conversation.title.toLowerCase().includes(query) ||
        conversation.preview.toLowerCase().includes(query)
    );
  }
);

export const selectActiveConversationData = createSelector(
  [selectConversations, selectActiveConversation],
  (conversations, activeConversationId) => {
    if (!activeConversationId) return null;
    return conversations.find(conv => conv.id === activeConversationId) || null;
  }
); 
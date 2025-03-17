export const selectConversations = (state) => state.conversations.items;
export const selectActiveConversation = (state) => state.conversations.activeConversation;
export const selectSearchQuery = (state) => state.conversations.searchQuery;
export const selectFilteredConversations = (state) => {
    const conversations = state.conversations.items;
    const searchQuery = state.conversations.searchQuery.toLowerCase();
    
    return conversations.filter(conversation => 
        conversation.title.toLowerCase().includes(searchQuery) ||
        conversation.preview.toLowerCase().includes(searchQuery)
    );
};
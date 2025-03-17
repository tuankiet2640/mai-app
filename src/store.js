import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        // reducers here
        placeholder: (state = {}) => state,
        conversations: conversationReducer,
    },
});
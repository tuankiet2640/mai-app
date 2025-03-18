import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './store/conversationSlice';

export const store = configureStore({
    reducer: {
        // reducers here
        placeholder: (state = {}) => state,
        conversations: conversationReducer,
    },
});
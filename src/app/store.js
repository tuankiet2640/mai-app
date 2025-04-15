import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import conversationReducer from '../store/conversationSlice';
// import ragReducer from '../features/rag/ragSlice'; // To add later

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversations: conversationReducer,
    // rag: ragReducer,
  },
});

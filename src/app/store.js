import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import { usersApi } from '../features/api/usersApi';
import { knowledgeApi } from '../features/api/knowledgeApi';
import authReducer from '../features/auth/authSlice';
import conversationReducer from '../store/conversationSlice';
import ragReducer from '../features/rag/ragSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversations: conversationReducer,
    rag: ragReducer,
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [knowledgeApi.reducerPath]: knowledgeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, knowledgeApi.middleware),
});

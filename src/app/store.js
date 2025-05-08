import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import { usersApi } from '../features/api/usersApi';
import { knowledgeApi } from '../features/api/knowledgeApi';
import { ragApi } from '../features/api/ragApi';
import authReducer from '../features/auth/authSlice';
import conversationReducer from '../store/conversationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversations: conversationReducer,
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [knowledgeApi.reducerPath]: knowledgeApi.reducer,
    [ragApi.reducerPath]: ragApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, knowledgeApi.middleware, ragApi.middleware),
});

import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import modelReducer from './modelSlice';
import { knowledgeApi } from '../features/api/knowledgeApi';
import { queryApi } from '../features/api/queryApi';

export const store = configureStore({
  reducer: {
    conversations: conversationReducer,
    model: modelReducer,
    [knowledgeApi.reducerPath]: knowledgeApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(knowledgeApi.middleware)
      .concat(queryApi.middleware),
}); 
import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import modelReducer from './modelSlice';

export const store = configureStore({
  reducer: {
    conversations: conversationReducer,
    model: modelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for Date objects in the sample data
    }),
}); 
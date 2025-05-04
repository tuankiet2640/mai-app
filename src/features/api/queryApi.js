// src/features/api/queryApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiConfig from '../../config/apiConfig'; // Assuming apiConfig is correctly set up

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.getRagBaseUrl() + '/query/', // Base path for query endpoints
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['QueryLog'], // Optional: Define tags if you need to invalidate/refetch query logs later
  endpoints: (builder) => ({
    // Endpoint to query a knowledge base
    queryKnowledgeBase: builder.mutation({
      query: ({ knowledge_base_id, query, top_k }) => ({
        url: '', // POST to the base URL /query/
        method: 'POST',
        body: { knowledge_base_id, query, top_k }, // Backend expects these in the body
      }),
      // We don't invalidate anything here as the primary result is the answer/context,
      // and the log is created as a side effect.
      // If we had an endpoint to fetch query logs, we might invalidate 'QueryLog' here.
    }),
    // Endpoint to submit feedback for a query log
    submitFeedback: builder.mutation({
      query: ({ log_id, rating, comment }) => ({
        url: 'feedback', // POST to /query/feedback
        method: 'POST',
        body: { log_id, rating, comment },
      }),
      // Optional: If you fetch query logs and display feedback, you might invalidate here
      // invalidatesTags: (result, error, { log_id }) => [{ type: 'QueryLog', id: log_id }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useQueryKnowledgeBaseMutation,
  useSubmitFeedbackMutation,
} = queryApi;

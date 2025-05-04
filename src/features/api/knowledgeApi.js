import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiConfig from '../../config/apiConfig';

export const knowledgeApi = createApi({
  reducerPath: 'knowledgeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.getRagBaseUrl() + '/knowledge_bases/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['KnowledgeBase', 'Document'], 
  endpoints: (builder) => ({
    getKnowledgeBases: builder.query({
      query: () => '',
      providesTags: ['KnowledgeBase'],
    }),
    createKnowledgeBase: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['KnowledgeBase'],
    }),
    getKnowledgeBase: builder.query({
      query: (kbId) => `${kbId}`,
      providesTags: (result, error, kbId) => [{ type: 'KnowledgeBase', id: kbId }],
    }),
    updateKnowledgeBase: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'KnowledgeBase', id }, 'KnowledgeBase'],
    }),
    ingestDocument: builder.mutation({
      query: ({ kbId, documentData }) => ({
        url: `${kbId}/documents/`, 
        method: 'PUT',
        body: documentData,
      }),
      invalidatesTags: (result, error, { kbId }) => [
        { type: 'KnowledgeBase', id: kbId },
      ],
    }),
    getEmbeddingModels: builder.query({
      query: () => ({
        // Correctly fetch from the root path for this specific endpoint
        // Removed trailing slash
        url: apiConfig.getRagBaseUrl() + '/embedding_models', 
      }),
      // No tags needed for a static list usually
    }),
    deleteKnowledgeBase: builder.mutation({
      query: (kbId) => ({
        url: `${kbId}`, // Relative to the /knowledge_bases/ base URL
        method: 'DELETE',
      }),
      invalidatesTags: ['KnowledgeBase'], // Refetch the list after deletion
    }),
  }),
});

export const {
  useGetKnowledgeBasesQuery,
  useCreateKnowledgeBaseMutation,
  useGetKnowledgeBaseQuery,
  useUpdateKnowledgeBaseMutation, 
  useGetEmbeddingModelsQuery, 
  useIngestDocumentMutation,
  useDeleteKnowledgeBaseMutation, // Export new hook
} = knowledgeApi;

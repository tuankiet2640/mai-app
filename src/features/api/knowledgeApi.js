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
    ingestDocuments: builder.mutation({
      query: ({ kbId, formData }) => ({
        url: `${kbId}/ingest`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { kbId }) => [
        { type: 'KnowledgeBase', id: kbId },
        'Document',
      ],
    }),
    addRawTextDocument: builder.mutation({
      query: ({ kbId, body }) => ({
        url: `${kbId}/documents`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { kbId }) => [
        { type: 'KnowledgeBase', id: kbId },
        'Document',
      ],
    }),
  }),
});

export const {
  useGetKnowledgeBasesQuery,
  useCreateKnowledgeBaseMutation,
  useGetKnowledgeBaseQuery,
  useIngestDocumentsMutation,
  useAddRawTextDocumentMutation,
} = knowledgeApi;

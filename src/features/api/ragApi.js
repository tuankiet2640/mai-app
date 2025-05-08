import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiConfig from '../../config/apiConfig';

export const ragApi = createApi({
  reducerPath: 'ragApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.getRagBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['KnowledgeBase'], 
  endpoints: (builder) => ({
    queryKnowledgeBase: builder.mutation({
      query: ({ kbId, query }) => ({
        url: `/knowledge_bases/${kbId}/chat`,
        method: 'POST',
        body: { query },
      }),
    }),
    listKnowledgeBases: builder.query({
      query: () => '/knowledge_bases/',
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'KnowledgeBase', id })),
        { type: 'KnowledgeBase', id: 'LIST' },
      ],
    }),
    // TODO: Add other RAG service endpoints here (createKb, ingest) if needed
    // Example: createKnowledgeBase mutation would invalidate 'LIST' tag
    // createKnowledgeBase: builder.mutation({
    //   query: (newKb) => ({
    //     url: '/knowledge_bases/',
    //     method: 'POST',
    //     body: newKb,
    //   }),
    //   invalidatesTags: [{ type: 'KnowledgeBase', id: 'LIST' }],
    // }),
  }),
});

export const {
  useQueryKnowledgeBaseMutation,
  useListKnowledgeBasesQuery, 
} = ragApi;

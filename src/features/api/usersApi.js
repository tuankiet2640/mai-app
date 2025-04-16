import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiConfig from '../../config/apiConfig';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.getAuthBaseUrl(),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: (result) => {
        const users = Array.isArray(result)
          ? result
          : Array.isArray(result?.users)
            ? result.users
            : Array.isArray(result?.data)
              ? result.data
              : [];
        return [
          ...users.map(({ id }) => ({ type: 'User', id })),
          { type: 'User', id: 'LIST' },
        ];
      },
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUsersQuery, useRegisterUserMutation } = usersApi;

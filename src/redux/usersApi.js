import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: '/users',
        method: 'GET'
      })
    }),
    getUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET'
      })
    }),
    updateUser: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body
      })
    }),
    updateUserPassword: build.mutation({
      query: ({ id, ...body }) => {
        console.log(id);
        console.log(body)
        return {
          url: `/users/${id}/password`,
          method: 'PATCH',
          body: body,
        }
      },
    }),
  })
})

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useUpdateUserPasswordMutation } = usersApi
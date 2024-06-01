import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: '/registration',
        method: 'POST',
        body
      })
    }),
    login: build.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      })
    }),
  })
})

export const { useRegistrationMutation, useLoginMutation } = authApi
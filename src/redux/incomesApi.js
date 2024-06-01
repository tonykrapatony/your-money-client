import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const incomesApi = createApi({
  reducerPath: 'incomesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (build) => ({
    addIncome: build.mutation({
      query: (body) => ({
        url: '/incomes',
        method: 'POST',
        body
      })
    }),
    getUserIncome: build.query({
      query: (id) => ({
        url: `/incomes/user/${id}`,
        method: 'GET'
      })
    }),
    updateIncome: build.mutation({
      query: (id, body) => ({
        url: `/incomes/${id}`,
        method: 'PUT',
        body
      })
    }),
    deleteIncome: build.mutation({
      query: (id) => ({
          url: `/incomes/${id}`,
          method: 'DELETE',
      })
    }),
  })
})

export const { useAddIncomeMutation, useGetUserIncomeQuery, useUpdateIncomeMutation, useDeleteIncomeMutation} = incomesApi
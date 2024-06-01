import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (build) => ({
    addExpense: build.mutation({
      query: (body) => ({
        url: '/expense',
        method: 'POST',
        body
      })
    }),
    getUserExpense: build.query({
      query: (id) => ({
        url: `/expense/user/${id}`,
        method: 'GET'
      })
    }),
    deleteExpense: build.mutation({
      query: (id) => ({
          url: `/expense/${id}`,
          method: 'DELETE',
      })
    }),
  })
})

export const { useAddExpenseMutation, useGetUserExpenseQuery, useDeleteExpenseMutation } = expensesApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (build) => ({
    getUserStatistics: build.query({
      query: (id) => ({
        url: `/statistics/${id}`,
        method: 'GET'
      })
    }),
    getUserStatisticsByCategories: build.query({
      query: (id) => ({
        url: `/statisticsByCategories/${id}`,
        method: 'GET'
      })
    }),
  })
})

export const { useGetUserStatisticsQuery, useGetUserStatisticsByCategoriesQuery } = statisticsApi
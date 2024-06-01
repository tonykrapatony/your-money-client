import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'

import { authApi } from './authApi'
import { usersApi } from './usersApi'
import { incomesApi } from './incomesApi'
import { expensesApi } from './expensesApi'
import { statisticsApi } from './statisticApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,

    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [incomesApi.reducerPath]: incomesApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      incomesApi.middleware,
      expensesApi.middleware,
      statisticsApi.middleware,
    )
})
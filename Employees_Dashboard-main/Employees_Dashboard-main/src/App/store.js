import { configureStore } from '@reduxjs/toolkit';
import { timeApi } from '../Features/attendanceApi.js';

export const store = configureStore({
  reducer: {
    [timeApi.reducerPath]: timeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timeApi.middleware),
});

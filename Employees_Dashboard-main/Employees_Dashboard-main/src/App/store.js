import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { attendanceApi } from '../Features/attendanceApi';

export const store = configureStore({
  reducer: {
    [attendanceApi.reducerPath]: attendanceApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(attendanceApi.middleware)
});

setupListeners(store.dispatch);

// timeApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const timeApi = createApi({
  reducerPath: 'timeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/time/' }),
  tagTypes: ['time'],

  endpoints: (builder) => ({
    createTimeRecord: builder.mutation({
      query: (recordData) => ({
        url: 'createTime',
        method: 'POST',
        body: recordData,
      }),
      invalidatesTags: ['time'],
    }),
    updateTimeRecord: builder.mutation({
      query: (recordData) => ({
        url: 'updateTime',
        method: 'POST',
        body: recordData,
      }),
      invalidatesTags: ['time'],
    }),
    getTimeByEmployeeID: builder.query({
      query: (employeeID) => `getTimeByEmployeeID/${employeeID}`,
      providesTags: ['time'],
    }),
  }),
});

export const { useCreateTimeRecordMutation, useUpdateTimeRecordMutation, useGetTimeByEmployeeIDQuery } = timeApi;

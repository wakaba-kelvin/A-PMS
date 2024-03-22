import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const attendanceApi = createApi({
    reducerPath: 'attendanceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/attendance/' }),
    tagTypes: ['attendance'],

    endpoints: (builder) => ({
        createTimeRecord: builder.mutation({
            query: ({ EmployeeID, ClockInTime, ClockOutTime, Rate }) => ({
                url: 'createTime',
                method: 'POST',
                body: { EmployeeID, ClockInTime, ClockOutTime, Rate },
            }),
            invalidatesTags: ['attendance'],
        }),
        updateTimeRecord: builder.mutation({
            query: ({ EmployeeID, ClockInTime, ClockOutTime, Rate }) => ({
                url: 'updateTime',
                method: 'POST',
                body: { EmployeeID, ClockInTime, ClockOutTime, Rate },
            }),
            invalidatesTags: ['attendance'],
        }),
        getTimeByEmployeeID: builder.query({
            query: (employeeID) => `getTimeByEmployeeID/${employeeID}`,
            providesTags: ['attendance'],
        }),
        getAllTimeRecords: builder.query({
            query: () => 'getTime',
            providesTags: ['attendance'],
        }),
    }),
});

export const { useCreateTimeRecordMutation, useUpdateTimeRecordMutation, useGetTimeByEmployeeIDQuery, useGetAllTimeRecordsQuery } = attendanceApi;

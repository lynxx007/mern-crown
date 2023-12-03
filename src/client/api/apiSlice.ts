import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    home: builder.query({
      query: () => '/home',
    }),
    getShopData:builder.query({
      query: ()=>'/shop'
    })
  }),
});

export const { useHomeQuery,useGetShopDataQuery } = apiSlice;

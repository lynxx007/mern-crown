import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { UserState, logIn, logOut } from "../app/auth/authSlice";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://mern-crown.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error?.data === "Forbidden") {
    const refreshResponse = await baseQuery(
      "/auth/new_access_token",
      api,
      extraOptions
    );

    if (refreshResponse.data) {
      api.dispatch(logIn(refreshResponse.data as UserState));
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut(undefined));
    }
  }

  return response;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    home: builder.query<
      Array<{
        _id: string;
        id: number;
        title: string;
        imageUrl: string;
        route: string;
      }>,
      void
    >({
      query: () => "/home",
    }),
    getShopData: builder.query<
      Array<{
        category: string;
        info: Array<{
          imageUrl: string;
          name: string;
          price: number;
          size: string[];
          _id: string;
        }>;
        _id: string;
      }>,
      void
    >({
      query: () => `/shop`,
      providesTags: ["Product"],
    }),
    getDataForCategory: builder.query<
      Array<{
        imageUrl: string;
        name: string;
        price: number;
        size: string[];
        _id: string;
      }>,
      string
    >({
      query: (category) => `/shop/${category}`,
      providesTags: ["Product"],
    }),
  }),
  tagTypes: ["User", "Product"],
});

export const { useHomeQuery, useGetShopDataQuery, useGetDataForCategoryQuery } =
  apiSlice;

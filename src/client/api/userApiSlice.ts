import { apiSlice } from "./apiSlice";

export interface resProfile {
  success: boolean;
  msg: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    imageUrl?: string;
    accessToken: string;
    address?: string;
    email: string;
    roles: Array<string>;
    city: string;
    isEmailVerified: boolean;
    active: boolean;
  };
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<resProfile, FormData>({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
    }),
    getUserProfile: builder.query<resProfile, void>({
      query: () => ({
        url: "/user/profile",
      }),
    }),
    getAllUsers: builder.query<
      {
        success: boolean;
        count: number;
        numberOfPages: number;
        users: Array<resProfile["user"]>;
      },
      number | undefined
    >({
      query: (pageNumber) => ({
        url: "/user/getAll",
        params: pageNumber,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map((user) => ({
                type: "User" as const,
                id: user._id,
              })),
              "User",
            ]
          : ["User"],
    }),
    deleteUserByAdmin: builder.mutation<
      { success: boolean; msg: string },
      string
    >({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    disableUserByAdmin: builder.mutation<
      { success: boolean; msg: string },
      string
    >({
      query: (id) => ({
        url: `/user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useGetAllUsersQuery,
  useDeleteUserByAdminMutation,
  useDisableUserByAdminMutation,
} = userApiSlice;

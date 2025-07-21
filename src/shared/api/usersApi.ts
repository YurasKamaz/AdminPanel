import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserFormValues } from "@/entities/user/types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Users", "User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserFormValues[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getUser: builder.query<UserFormValues, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<void, Partial<UserFormValues>>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<void, { id: string; data: Partial<UserFormValues> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users" },
        { type: "User", id },
      ],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;

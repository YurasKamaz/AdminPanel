import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ success: boolean }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getMe: builder.query<{ email: string }, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;

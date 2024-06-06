import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (cred) => ({
        url: "auth/login",
        method: "POST",
        body: cred,
      }),
    }),
    register: build.mutation({
      query: (cred) => ({
        url: "auth/register",
        method: "POST",
        body: cred,
      }),
    }),
    logout: build.mutation({
      queryFn: () => ({ data: {} }),
    }),
  }),
});

export const { useLogoutMutation, useLoginMutation, useRegisterMutation } =
  authApi;

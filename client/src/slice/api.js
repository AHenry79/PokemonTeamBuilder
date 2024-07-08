import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers, { getState }) => {
      const credentials = window.sessionStorage.getItem("CREDENTIALS");
      const parsedCredentials = JSON.parse(credentials || "{}");
      const token = parsedCredentials.token;
      if (token) {
        headers.set("Authorization", token);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (cred) => ({
        url: "/api/auth/register",
        method: "POST",
        body: cred,
      }),
    }),
    login: build.mutation({
      query: (cred) => ({
        url: "/api/auth/login",
        method: "POST",
        body: cred,
      }),
    }),
    logout: build.mutation({
      queryFn: () => ({ data: {} }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = api;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../api/base-query";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: { email, password },
      }),
    }),
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useSendEmailMutation } =
  authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { pathBase, pathLogin, pathRegister } from "src/path";

type authRequest = {
  username: string;
  password: string;
};

type registerResponse = {
  access_token: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: pathBase,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  // tagTypes: ['Post'],
  endpoints: (build) => ({
    register: build.mutation<string, authRequest>({
      query: (requestBody) => ({
        url: pathRegister,
        body: requestBody,
        method: "POST",
      }),
      transformResponse: (response: registerResponse, meta, arg) => {
        return response.access_token;
      },
    }),
    login: build.mutation<string, authRequest>({
      query: (requestBody) => ({
        url: pathBase + "/" + pathLogin,
        body: requestBody,
        method: "POST",
      }),
      transformResponse: (response: registerResponse, meta, arg) => {
        return response.access_token;
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";

const BASE_API_URL = "https://jsonplaceholder.typicode.com/";
export const commonApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }) as BaseQueryFn<string | FetchArgs>,
  endpoints: () => ({}),
});

import type {BaseQueryFn, FetchArgs, FetchBaseQueryError,} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Mutex } from 'async-mutex';
import authActions from "./authActions.ts";

interface RefreshData {
  access: string;
}

const SERVER_URL = import.meta.env.VITE_BASE_URL
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_URL}`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token') || '';
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
            {
              url: `/auth/refresh/`,
              method: 'POST',
              body: { refresh: localStorage.getItem("refresh_token") },
            },
            api,
            extraOptions
        );
        if (refreshResult.data) {
          localStorage.setItem(
              "access_token",
              (refreshResult.data as RefreshData).access
          );
          api.dispatch(authActions.setAuth());

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(authActions.logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const commonApi = createApi({
  reducerPath: 'authReducer',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
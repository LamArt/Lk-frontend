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
    const token = getCookie('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
            {
              url: `/auth/refresh/`,
              method: 'POST',
              body: { refresh: getCookie('refresh_token') },
            },
            api,
            extraOptions
        );
        if (refreshResult.data) {
          document.cookie = `access_token=${(refreshResult.data as RefreshData).access}; path=/`;
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

const commonApi = createApi({
  reducerPath: 'authReducer',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

function getCookie(name: string) {
  const cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    const cookiePair = cookieArray[i].split('=');
    const cookieKey = cookiePair[0].trim();
    if (cookieKey === name) {
      return cookiePair[1];
    }
  }
  return '';
}

export default commonApi
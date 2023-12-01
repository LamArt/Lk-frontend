import type {Api, BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {createApi, fetchBaseQuery, reactHooksModuleName} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import authActions from './authActions.ts';
import Cookies from 'universal-cookie';
import { coreModuleName } from '@reduxjs/toolkit/query';

interface RefreshData {
  access: string;
}

const SERVER_URL = import.meta.env.VITE_BASE_URL;
const mutex = new Mutex();
const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_URL}`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = cookies.get('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, 
  api, 
  extraOptions) => {
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
            body: { refresh: cookies.get('refresh_token') },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          cookies.set(
            'access_token',
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

const commonApi = createApi({
  reducerPath: 'authReducer',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export type CommonApi = Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, {}, 'authReducer', never, typeof coreModuleName | typeof reactHooksModuleName>;
export default commonApi;

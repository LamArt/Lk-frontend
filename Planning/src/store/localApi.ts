import type {
  Api,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { reactHooksModuleName } from "@reduxjs/toolkit/query/react";
import { coreModuleName } from "@reduxjs/toolkit/query";
import commonApi from "authorization/commonApi";

export type T_CommonApi = Api<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  {},
  "authReducer",
  never,
  typeof coreModuleName | typeof reactHooksModuleName
>;
export const localApi = commonApi as T_CommonApi;

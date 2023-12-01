import commonApi from "authorization/commonApi";
import type {
  Api,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { reactHooksModuleName } from "@reduxjs/toolkit/query/react";
import { coreModuleName } from "@reduxjs/toolkit/query";


type CommonApi = Api<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  {},
  "authReducer",
  never,
  typeof coreModuleName | typeof reactHooksModuleName
>;
const localApi = commonApi as CommonApi;

export { localApi };

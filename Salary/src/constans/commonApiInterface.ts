import {
    Api,
    BaseQueryFn, coreModuleName,
    FetchArgs,
    FetchBaseQueryError,
    reactHooksModuleName
} from "@reduxjs/toolkit/dist/query/react";

export type CommonApi = Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, {}, "authReducer", never, typeof coreModuleName | typeof reactHooksModuleName>;
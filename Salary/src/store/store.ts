import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers.ts";
import commonApi from "authorization/commonApi"

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(commonApi.middleware),
})
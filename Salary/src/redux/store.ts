import { configureStore } from "@reduxjs/toolkit";
// import { commonApi } from "authorization/CommonApi";
import rootReducer from "./reducers.ts";
import { commonApi } from "./commonApi.ts";

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(commonApi.middleware),
})
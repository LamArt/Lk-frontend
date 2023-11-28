import { configureStore } from "@reduxjs/toolkit";
import { localApi } from "./localApi";
import { rootReducer } from "./rootReducer";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localApi.middleware),
});

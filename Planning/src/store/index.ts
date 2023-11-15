import { configureStore } from "@reduxjs/toolkit";
import { commonApi } from "./commonApi";
import { rootReducer } from "./rootReducer";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commonApi.middleware),
});

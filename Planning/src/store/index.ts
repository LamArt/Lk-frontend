import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { localApi } from "./localApi";
import commonApi from "authorization/commonApi";

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(commonApi.middleware),
// });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commonApi.middleware),
});

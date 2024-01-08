import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import {localApi} from "./localApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localApi.middleware),
})
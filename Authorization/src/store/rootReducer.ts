import { combineReducers } from "@reduxjs/toolkit";
import { commonApi } from "./commonApi";

export const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
});

// Экспортируем тип RootState
export type RootState = ReturnType<typeof rootReducer>;
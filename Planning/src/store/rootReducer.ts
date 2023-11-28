import { combineReducers } from "@reduxjs/toolkit";
import commonApi from "authorization/commonApi";
import { localApi } from "./localApi";

export const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
});

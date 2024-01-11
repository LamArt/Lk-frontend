import {combineReducers} from "@reduxjs/toolkit";
import {localApi} from "./localApi";

export const rootReducer = combineReducers({
  [localApi.reducerPath]: localApi.reducer,
})
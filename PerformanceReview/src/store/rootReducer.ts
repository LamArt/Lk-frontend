import {combineReducers} from "@reduxjs/toolkit";
import commonApi from "authorization/commonApi"

export const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
})
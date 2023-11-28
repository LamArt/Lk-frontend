import { combineReducers } from "@reduxjs/toolkit";
import { commonApi } from "../../../Authorization/src/store/commonApi";

export const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
});

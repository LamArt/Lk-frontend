// import { commonApi } from 'authorization/CommonApi'
import { combineReducers } from '@reduxjs/toolkit'
import { commonApi } from "./commonApi.ts";

const rootReducer = combineReducers({
    [commonApi.reducerPath]: commonApi.reducer,
})

export default rootReducer

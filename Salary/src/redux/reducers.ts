import { commonApi } from './api.ts'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    [commonApi.reducerPath]: commonApi.reducer,
})

export default rootReducer

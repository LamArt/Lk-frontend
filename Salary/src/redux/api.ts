import Cookies from 'universal-cookie'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";

interface ErrorType {
    data: {
        error: {
            code: string,
            message?: string,
            violations: [string]
        }
    },
    status: number,
}

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const cookies = new Cookies()

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        credentials: 'include',
        prepareHeaders: headers => {
            const csrfToken = cookies.get('csrftoken')
            if (csrfToken) {
                headers.set('X-CSRFToken', csrfToken)
            }
            const jwtToken = cookies.get('jwtToken')
            if (jwtToken) {
                headers.set('Authorization', `Bearer ${jwtToken}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }) as BaseQueryFn<string | FetchArgs, unknown, ErrorType, {}>,
    endpoints: _ => ({}),
})

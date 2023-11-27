// import { commonApi } from 'authorization/CommonApi';

import { commonApi } from "./commonApi.ts";

const test = commonApi.injectEndpoints({
    // @ts-ignore
    endpoints: (build) => ({
        getSalary: build.query({
            query: () => ({
                url: '/salary/at_moment/',
                method: 'GET',
            }),
        }),
        getProfile: build.query({
            query: () => ({
                url: '/profile/',
                method: 'GET',
            }),
        }),
        getJiraToken: build.mutation({
            query: ({ authorization_code }) => ({
                url: '/auth/get_token_jira/',
                method: 'POST',
                body: { authorization_code }
            }),
        }),
    }),
});

export const { useGetSalaryQuery, useGetProfileQuery, useGetJiraTokenMutation } = test;
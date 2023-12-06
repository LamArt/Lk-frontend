import commonApi from "authorization/commonApi"
import {CommonApi} from "../../constans/commonApiInterface.ts";

const backend = (commonApi as CommonApi).injectEndpoints({
    endpoints: (build) => ({
        getSalary: build.query<{ reward: string, story_points: string, credit: string, salary: string, rate: string }, void>({
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
        getJiraToken: build.mutation<{ refresh: string, access: string }, { authorization_code: string }>({
            query: ({ authorization_code }) => ({
                url: '/auth/get_token_jira/',
                method: 'POST',
                body: { authorization_code }
            }),
        }),
    }),
});

export const { useGetSalaryQuery, useGetProfileQuery, useGetJiraTokenMutation } = backend;
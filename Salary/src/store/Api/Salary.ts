import commonApi from "authorization/commonApi"
import {CommonApi} from "../../constans/commonApiInterface.ts";
import {RequestJiraToken, ResponseJiraToken, ResponseSalary, ResponseStatistic} from "../../interfaces/Api.ts";

const salaryApi = (commonApi as CommonApi).injectEndpoints({
    endpoints: (build) => ({
        getSalary: build.query<ResponseSalary, void>({
            query: () => ({
                url: '/salary/at_moment/',
                method: 'GET',
            }),
        }),
        getStatistic: build.query<ResponseStatistic, void>({
            query: () => ({
                url: '/salary/statistics/',
                method: 'GET',
            }),
        }),
        getJiraToken: build.mutation<ResponseJiraToken, RequestJiraToken>({
            query: ({ authorization_code }) => ({
                url: '/auth/get_token_jira/',
                method: 'POST',
                body: { authorization_code }
            }),
        }),
    }),
});

export const { useGetSalaryQuery,useGetStatisticQuery, useGetJiraTokenMutation } = salaryApi;
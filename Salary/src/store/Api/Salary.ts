import commonApi from "authorization/commonApi"
import {CommonApi} from "../../constans/commonApiInterface.ts";
import {RequestJiraToken, ResponseJiraToken, ResponseSalary} from "../../interfaces/Api.ts";

const salaryApi = (commonApi as CommonApi).injectEndpoints({
    endpoints: (build) => ({
        getSalary: build.query<ResponseSalary, void>({
            query: () => ({
                url: '/salary/at_moment/',
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

export const { useGetSalaryQuery, useGetJiraTokenMutation } = salaryApi;
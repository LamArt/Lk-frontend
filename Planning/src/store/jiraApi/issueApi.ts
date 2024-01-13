import { localApi } from '../localApi';
export type Task = {
    title: string;
    description: string;
    priority: {
        name: 'Highest' | 'High' | 'Medium' | 'Lowest' | 'Low';
        id: string;
    };
    story_points: number;
};

export type Issue = {
    title: string;
    description: string;
    priority: {
        name: 'Highest' | 'High' | 'Medium' | 'Lowest' | 'Low';
        id: string;
    };
    story_points: number;
    subtasks: Task[];
};
export interface ResponseJiraToken {
    access: string;
}

export interface RequestJiraToken {
    authorization_code: string;
}

export interface Error {
    data: {
        detail: string;
    };
    status: number;
}

const issueApi = localApi.injectEndpoints({
    endpoints: (build) => ({
        getIssues: build.query<Issue[], void>({
            query: () => ({
                url: '/planning/jira_issues/',
                method: 'GET',
            }),
        }),
        getJiraToken: build.mutation<ResponseJiraToken, RequestJiraToken>({
            query: ({ authorization_code }) => ({
                url: '/auth/get_token_jira/',
                method: 'POST',
                body: { authorization_code },
            }),
        }),
    }),
});

export const { useGetIssuesQuery, useGetJiraTokenMutation } = issueApi;

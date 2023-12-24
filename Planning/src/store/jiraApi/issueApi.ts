import { localApi } from '../localApi';
type Task = {
    title: string;
    description: string;
    priority: {
        name: 'Highest' | 'High' | 'Medium' | 'Lowest' | 'Low';
        id: string;
    };
};

export type Issues = {
    title: string;
    description: string;
    priority: {
        name: 'Highest' | 'High' | 'Medium' | 'Lowest' | 'Low';
        id: string;
    };
    subtastks: Task[];
};

const issueApi = localApi.injectEndpoints({
    endpoints: (build) => ({
        getIssues: build.query<Issues[], void>({
            query: () => ({
                url: '/planning/jira_issues/',
                method: 'GET',
            }),
        }),
    }),
});
export const { useGetIssuesQuery } = issueApi;

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

const issueApi = localApi.injectEndpoints({
    endpoints: (build) => ({
        getIssues: build.query<Issue[], void>({
            query: () => ({
                url: '/planning/jira_issues/',
                method: 'GET',
            }),
        }),
    }),
});
export const { useGetIssuesQuery } = issueApi;

export interface ResponseSalary {
    total_salary: number;
    projects: Record<string, ProjectData>;
}

interface ProjectData {
    role: string;
    story_points: number;
    rate: number;
    salary: number;
    reward: number;
    credit: number;
}

export interface ResponseJiraToken {
    access: string
}

export interface RequestJiraToken {
    authorization_code: string
}
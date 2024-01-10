export interface ResponseSalary {
    total_salary: string
    projects: Record<string, ProjectData>
}

interface ProjectData {
    role: string
    story_points: string
    rate: string
    salary: string
    reward: string
    credit: string
    [key: string]: string
}

export interface ResponseJiraToken {
    access: string
}

export interface RequestJiraToken {
    authorization_code: string
}
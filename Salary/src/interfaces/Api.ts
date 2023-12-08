export interface ResponseSalary {
    reward: string,
    story_points: string,
    credit: string,
    salary: string,
    rate: string
}

export interface ResponseJiraToken {
    refresh: string,
    access: string
}

export interface RequestJiraToken {
    authorization_code: string
}
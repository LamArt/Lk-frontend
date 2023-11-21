import {commonApi} from "../commonApi";

type employeeFormData = {
  achievements?: string,
  ways_to_achieve?: string,
  strengths: string,
  weaknesses: string,
  hard_skills_rate: number,
  productivity_rate: number,
  communication_rate: number,
  initiative_rate: number,
  about?: number,
  team: number,
}

type ReturnedData = {
  status: number,
}

const reviewApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    employeeForm: build.mutation<ReturnedData, employeeFormData>({
      query: (data) => ({
        url: '/review/employee_form',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useEmployeeFormMutation
} = reviewApi
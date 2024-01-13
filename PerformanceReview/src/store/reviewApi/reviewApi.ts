import {localApi} from "../localApi";

export interface EmployeeFormData{
  achievements: string,
  ways_to_achieve: string,
  strengths: string,
  weaknesses: string,
  hard_skills_rate: number,
  productivity_rate: number,
  communication_rate: number,
  initiative_rate: number,
  created_by: number,
  about: number,
  team: number,
}

export interface TeamleadFormData extends EmployeeFormData{
  summary: number
}

type ReturnedData = {
  status: number,
}

export type Teammate = {
  first_name: string;
  gender: string;
  last_name: string;
  status_level: string;
  teams__name: string;
  username: string;
  id: number;
}

const reviewApi = localApi.injectEndpoints({
  endpoints: (build) => ({
    postEmployeeForm: build.mutation<ReturnedData, Partial<EmployeeFormData>>({
      query: (data) => ({
        url: '/review/employee_forms/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EmployeeForm']
    }),
    getEmployeeForm: build.query({
      query: (data) => ({
        url: `/review/employee_forms/users/${data.username}/`,
        method: "GET",
      }),
      // providesTags: ['EmployeeForm']
    }),
    getTeamleadForm: build.query({
      query: () => ({
        url: `/review/teamlead_forms/`,
        method: "GET",
      }),
    }),
    postTeamleadForm: build.mutation({
      query: (data) => ({
        url: `/review/teamlead_forms/`,
        method: "POST",
        body: data,
      }),
    }),
    getTeammates: build.query<{ teammates: Teammate[] }, void>({
      query: () => ({
        url: "/review/teammates/",
        method: "GET",
      }),
    }),
    getTeamleadFormsByUser: build.query({
      query: (data) => ({
        url: `/review/teamlead_forms/users/${data.username}/`,
        method: "GET",
      }),
    }),
    postTeamleadFormsByUser: build.mutation({
      query: (data) => ({
        url: `/review/teamlead_forms/users/${data.username}/`,
        method: "POST",
        body: data
      }),
    }),
    getProfile: build.query({
      query: () => ({
        url: "/profile/",
        method: "GET",
      }),
    }),
  }),
})

export const {
  usePostEmployeeFormMutation,
  useGetTeammatesQuery,
  useGetEmployeeFormQuery,
  usePostTeamleadFormMutation,
  useGetTeamleadFormQuery,
  useGetTeamleadFormsByUserQuery,
  usePostTeamleadFormsByUserMutation,
  useGetProfileQuery,
} = reviewApi
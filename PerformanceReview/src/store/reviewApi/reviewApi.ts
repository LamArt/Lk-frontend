import {localApi} from "../localApi";

export type EmployeeFormData = {
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

export type Teammate = {
  first_name: string;
  gender: string;
  last_name: string;
  username: string;
}

const reviewApi = localApi.injectEndpoints({
  endpoints: (build) => ({
    postEmployeeForm: build.mutation<ReturnedData, EmployeeFormData>({
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
      providesTags: ['EmployeeForm']
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
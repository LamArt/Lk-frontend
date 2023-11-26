import commonApi from "authorization/commonApi"

// type employeeFormData = {
//   achievements?: string,
//   ways_to_achieve?: string,
//   strengths: string,
//   weaknesses: string,
//   hard_skills_rate: number,
//   productivity_rate: number,
//   communication_rate: number,
//   initiative_rate: number,
//   about?: number,
//   team: number,
// }
//
// type ReturnedData = {
//   status: number,
// }

const reviewApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    postTeamleadForm: build.mutation({
      query: (data) => ({
        url: '/review/teamlead_forms/',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  usePostTeamleadFormMutation
} = reviewApi
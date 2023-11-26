import commonApi from "authorization/commonApi"

const exampleApi = commonApi.injectEndpoints({
  endpoints: (build: any) => ({
    getAllPosts: build.mutation({
      query: () => ({
        url: '/profile/',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllPostsQuery
} = exampleApi
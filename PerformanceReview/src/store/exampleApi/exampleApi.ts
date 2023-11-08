import {commonApi} from "../commonApi";

const exampleApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllPostsQuery
} = exampleApi
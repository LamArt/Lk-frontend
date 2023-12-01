import commonApi from "./commonApi";

const test = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "/profile/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = test;

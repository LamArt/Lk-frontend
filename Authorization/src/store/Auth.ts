import commonApi from "./commonApi";

const test = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.mutation({
            query: () => ({
                url: '/profile/',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetProfileMutation } = test;
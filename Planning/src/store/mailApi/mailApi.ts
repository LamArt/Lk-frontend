import { localApi } from "../localApi";

const mailApi = localApi.injectEndpoints({
  endpoints: (build) => ({
    getCountMail: build.mutation({
      query: () => ({
        url: "/planning/mail_count/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCountMailMutation } = mailApi;

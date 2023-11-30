import { localApi } from "../localApi";

const mailApi = localApi.injectEndpoints({
  endpoints: (build) => ({
    getCountMail: build.query({
      query: () => ({
        url: "/planning/mail_count/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCountMailQuery } = mailApi;

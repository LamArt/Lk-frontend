import { localApi } from "../localApi";

type T_CountMail = {
  count: number;
};

const mailApi = localApi.injectEndpoints({
  endpoints: (build) => ({
    getCountMail: build.query<T_CountMail, void>({
      query: () => ({
        url: "/planning/mail_count/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCountMailQuery } = mailApi;

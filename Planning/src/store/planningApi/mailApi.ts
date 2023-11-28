import { localApi } from "../localApi";
import commonApi from "authorization/commonApi";
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

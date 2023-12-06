import { localApi } from "../localApi";
export type Event = {
  [id: string]: {
    description: string | null,
    end_time: string,
    start_time: string,
    title: string,
    url: string
  }
};


const eventsApi = localApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<Event, void>({
      query: () => ({
        url: "/planning/calendar_events/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;

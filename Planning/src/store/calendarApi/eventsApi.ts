import { localApi } from '../localApi';
export type Event = {
    [id: string]: {
        description: string | null;
        end_time: string;
        start_time: string;
        title: string;
        url: string;
    };
};

export type NewEvent = {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    create_conference: boolean;
    attendees?: string[];
};
type ReturnedData = {
    status: number;
};

const eventsApi = localApi.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query<Event, void>({
            query: () => ({
                url: '/planning/calendar_events/',
                method: 'GET',
            }),
        }),
        postNewEvent: build.mutation<ReturnedData, NewEvent>({
            query: (data) => ({
                url: '/planning/calendar_events/',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetEventsQuery, usePostNewEventMutation } = eventsApi;

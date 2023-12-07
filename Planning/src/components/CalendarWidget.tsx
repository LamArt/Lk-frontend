import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import EventCard from "./UI/EventCard";
import FormEvent from "./formEvent/FormEvent";
import "./CalendarWidget.scss";
import { useEffect, useState } from 'react';
import { useGetEventsQuery, Event } from "../store/calendarApi/eventsApi";

interface EventItemProps {
  eventId: string;
  event: {
    description: string | null;
    end_time: string;
    start_time: string;
    title: string;
    url: string;
  };
}
const CalendarWidget = () => {
  const today: Date = new Date();
  const formattedDate: string = format(today, "d MMMM yyyy", { locale: ruLocale, });
  const { data } = useGetEventsQuery();
  const [eventList, setEventList] = useState<Event>({});
  useEffect(() => {
    const fetchMail = async () => {
      if(data !== undefined){
        setEventList(data)
    }
    if(data=== null){
      console.log('uups')
    }
    };
    fetchMail();
  }, [data])
  return (
    <div className="calendar-main-window">
      <p className="date">{formattedDate}</p>
      <div className="calendar-event-container">
        <div className="timeline"></div> 
      <ul>
      {Object.entries(eventList).map(([key, data]) => (
        <li  key={key}>
        <EventCard event={data} />
        </li>
      ))}
      </ul>
      </div>
      <FormEvent />
    </div>
  );
};
export default CalendarWidget;

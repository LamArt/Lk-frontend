import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import EventCard from './UI/EventCard';
import FormEvent from './formEvent/FormEvent';
import './CalendarWidget.scss';
import { useEffect, useState, useRef } from 'react';
import { useGetEventsQuery, Event } from '../store/calendarApi/eventsApi';
import Timeline from './UI/Timeline';
const CalendarWidget = () => {
    const today: Date = new Date();
    const formattedDate: string = format(today, 'd MMMM yyyy', {
        locale: ruLocale,
    });
    const { data, refetch } = useGetEventsQuery();
    const [eventList, setEventList] = useState<Event>({});
    useEffect(() => {
        //check errors add
        const fetchEvents = async () => {
            await refetch();
            if (data !== undefined) {
                setEventList(data);
                console.log(data);
            }
        };
        fetchEvents();
        const intervalId = setInterval(() => {
            fetchEvents();
        }, 100000); //поменять

        return () => clearInterval(intervalId);
    }, [data, refetch]);

    const eventIdToNode = useRef<Record<string, HTMLElement | null>>({});

    const attachEventNodeRef = (id: string) => (node: HTMLElement | null) => {
        eventIdToNode.current[id] = node;
    };

    const mainEventContainer = useRef(null);

    return (
        <div className="calendar-main-window">
            <p className="date">{formattedDate}</p>
            <div ref={mainEventContainer} className="calendar-event-container">
                <Timeline
                    eventList={eventList}
                    eventIdToNode={eventIdToNode}
                    eventsContainer={mainEventContainer}
                />
                {data === null ? (
                    <div className="msg-about-event">
                        <p>Мероприятий на сегодня нет</p>
                    </div>
                ) : (
                    <ul className="event-list-items">
                        {Object.entries(eventList).map(([id, data]) => (
                            <li ref={attachEventNodeRef(id)} key={id}>
                                <EventCard event={data} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <FormEvent />
        </div>
    );
};
export default CalendarWidget;

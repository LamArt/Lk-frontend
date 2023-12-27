import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import EventCard from './UI/EventCard';
import FormEvent from './formEvent/FormEvent';
import './CalendarWidget.scss';
import { useEffect, useState, useRef } from 'react';
import { useGetEventsQuery, Event } from '../store/calendarApi/eventsApi';
import { Spin } from 'antd';
import Timeline from './UI/Timeline';

const CalendarWidget = () => {
    const today: Date = new Date();
    const formattedDate: string = format(today, 'd MMMM yyyy', {
        locale: ruLocale,
    });
    const { data, refetch, isLoading } = useGetEventsQuery();
    const [eventList, setEventList] = useState<Event>({});
    const eventIdToNode = useRef<Record<string, HTMLElement | null>>({});
    const attachEventNodeRef = (id: string) => (node: HTMLElement | null) => {
        eventIdToNode.current[id] = node;
    };
    const mainEventContainer = useRef(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                await refetch();
                if (data !== undefined) {
                    setEventList(data);
                }
            } catch (error) {
                console.log('Error post data:', error);
            }
        };
        fetchEvents();
        const intervalId = setInterval(() => {
            fetchEvents();
        }, 300000); //5 минут

        return () => clearInterval(intervalId);
    }, [data, refetch]);

    return (
        <>
            <a className='calendarLink'
            href = 'https://calendar.yandex.ru' 
            target="_blank">
                <img src = {"/icons/calendarIcon.svg"}></img> 
                <p className='calendarLabel'>Я-календарь</p>
            </a>
            <div className="calendar-main-window">
                <p className="date">{formattedDate}</p>
                    <div ref={mainEventContainer} className="calendar-event-container">
                        <Timeline
                            eventList={eventList}
                            eventIdToNode={eventIdToNode}
                            eventsContainer={mainEventContainer}
                        />
                        {isLoading ? (
                            <div className="msg-about-event">
                                <Spin size="large" style={{ margin: 'auto' }} />
                            </div>
                        ) : data === null ? (
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
        </>
    );
};
export default CalendarWidget;

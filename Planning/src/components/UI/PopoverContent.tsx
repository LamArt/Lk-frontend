import { Event } from '../../store/calendarApi/eventsApi';
import { EditOutlined } from '@ant-design/icons';
export const PopoverContentEvent = ({ event }: Event) => {
    return (
        <div className="info">
            <a href={event.url} className="info-url" target="_blank">
                <EditOutlined className="info-edit-btn" />
            </a>
            <h2 className="event-status">{event.title}</h2>
            <p className="event-time">
                {event.start_time.slice(11, 16)} -{' '}
                {event.end_time.slice(11, 16)}
            </p>
            <div className="info-description-wrapper">
                <p className="event-reminder">{event.description}</p>
            </div>
        </div>
    );
};

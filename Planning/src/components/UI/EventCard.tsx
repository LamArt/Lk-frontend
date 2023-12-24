import { Event } from '../../store/calendarApi/eventsApi';
import { format } from 'date-fns-tz';
import { Popover } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const EventCard = ({ event }: Event) => {
    function getCurrentDateTime() {
        const now = new Date();
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const formattedDateTime = format(now, 'yyyy-MM-dd HH:mm:ssXXX', {
            timeZone,
        });
        return formattedDateTime;
    }
    const currTime = new Date(getCurrentDateTime());
    const content = (
        <div className="info-wrapper">
            <a href={event.url} className="info-wrapper-url" target="_blank">
                <EditOutlined className="info-wrapper-edit-btn" />
            </a>
            <h2 className="event-status">{event.title}</h2>
            <p className="event-time">
                {event.start_time.slice(11, 16)} -{' '}
                {event.end_time.slice(11, 16)}
            </p>
            <div className="info-wrapper-description">
                <p className="event-reminder">{event.description}</p>
            </div>
        </div>
    );

    return (
        <div style={{ cursor: 'pointer' }}>
            <Popover content={content} placement="right" trigger="click">
                <ul
                    className={
                        currTime.getTime() > new Date(event.end_time).getTime()
                            ? 'list not-active-event'
                            : 'list'
                    }
                >
                    <li className="list-item">
                        <p className="event-time">
                            {event.start_time.slice(11, 16)}-
                            {event.end_time.slice(11, 16)}
                        </p>
                    </li>
                    <li className="list-item">
                        <h2 className="event-status">{event.title}</h2>
                    </li>
                    <li className="list-item">
                        <p className="event-reminder">{event.description}</p>
                    </li>
                </ul>
            </Popover>
        </div>
    );
};
export default EventCard;

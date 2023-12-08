import { useState } from "react";
import EventInfo from "../formEvent/EventInfo";
import { Event } from "../../store/calendarApi/eventsApi";
import {format} from 'date-fns-tz';
const EventCard = ({event}: Event) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function getCurrentDateTime() {
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDateTime = format(now, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });
    return formattedDateTime;
  }
  const currTime = new Date(getCurrentDateTime());
  return (
    <div style={{ cursor: "pointer" }}>
      {/* <EventInfo visible={isModalOpen} onClose={handleCloseModal} /> */}
      <ul className={currTime.getTime() > new Date(event.end_time).getTime() ?  'list not-active-event' : "list"}>
        <li className="list-item">
          <p className={'event-time'}>{event.start_time.slice(11, 16)}-{event.end_time.slice(11, 16)}</p>
        </li>
        <li className="list-item">
          <h2 className="event-status">{event.title}</h2>
        </li>
        <li className="list-item">
          <p className="event-reminder">{event.description}</p>
        </li>
      </ul>
    </div>
  );
};
export default EventCard;

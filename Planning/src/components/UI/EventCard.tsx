import { useState } from "react";
import EventInfo from "../formEvent/EventInfo";
import { Event } from "../../store/calendarApi/eventsApi";

const EventCard = ({event}: Event) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ cursor: "pointer" }}>
      {/* <EventInfo visible={isModalOpen} onClose={handleCloseModal} /> */}
      <ul className="list">
        <li className="list-item">
          <p className="meeting-time">{event.start_time.slice(11, 16)}-{event.end_time.slice(11, 16)}</p>
        </li>
        <li className="list-item">
          <h2 className="meeting-status">{event.title}</h2>
        </li>
        <li className="list-item">
          <p className="meeting-reminder">{event.description}</p>
        </li>
      </ul>
    </div>
  );
};
export default EventCard;

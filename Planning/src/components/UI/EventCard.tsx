import { useState } from "react";
import EventInfo from "../formEvent/EventInfo";
const EventCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prevState => {
      console.log("i'm in open");
      console.log(prevState, 'предыдущее состояние');    
      return true;
    });
    console.log(isModalOpen);
    console.log("shouldn't be here when click on closeButton!");
  };

  const handleCloseModal = () => {
    setIsModalOpen(prevState => {
      console.log("click on closeButton");
      console.log(prevState, 'предыдущее состояние');    
      return false;
    });
  };

  return (
    <div onClick={handleOpenModal} style={{ cursor: "pointer" }}>
      <EventInfo visible={isModalOpen} onClose={handleCloseModal} />
      <ul className="list">
        <li className="list-item">
          <p className="meeting-time">14:00-15:00</p>
        </li>
        <li className="list-item">
          <h2 className="meeting-status">Мероприятие еще не наступило</h2>
        </li>
        <li className="list-item">
          <p className="meeting-reminder">Ждем мероприятие</p>
        </li>
      </ul>
    </div>
  );
};
export default EventCard;

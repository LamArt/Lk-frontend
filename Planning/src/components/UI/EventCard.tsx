import { useState } from "react";
import EventInfo from "../formEvent/EventInfo";
const EventCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log(isModalOpen);
    console.log("I'm work!");
    setIsModalOpen(false);
    console.log(isModalOpen);
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
// icon = {<img className = "plus-image" src = "/icons/addImage.svg"/>}

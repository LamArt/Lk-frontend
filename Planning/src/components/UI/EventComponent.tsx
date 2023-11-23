import { Button } from "antd"
const EventCard = () => {
    return (
        <div>
            <ul className = "list">
                <li className = "list-item">
                    <p className="meeting-time">12:00-13:00</p>
                </li>
                <li className = "list-item">
                    <h2 className = "meeting-status not-active-meeting">Мероприятие уже прошло</h2>
                </li>
                <li className = "list-item">
                    <p className="meeting-reminder">Ждем мероприятие</p>
                </li>
            </ul>

            <ul className = "list">
                <li className = "list-item">
                    <p className="meeting-time">14:00-15:00</p>
                </li>
                <li className = "list-item">
                    <h2 className = "meeting-status">Мероприятие еще не наступило</h2>
                </li>
                <li className = "list-item">
                    <p className="meeting-reminder">Ждем мероприятие</p>
                </li>
            </ul>
            <Button 
            shape = "circle" 
            type = "primary" 
            className="buttonAddEvent">
                <img className = "plus-image" src = "/icons/addImage.svg"></img>
            </Button>
        </div>
    )
}
export default EventCard;

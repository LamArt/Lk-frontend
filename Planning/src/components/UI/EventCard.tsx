import { Button } from "antd"
const EventCard = () => {
    return (
        <div>
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
                    <img className = "plus-image" src = "/icons/addImage.svg"/>
            </Button>
        </div>
    )
}
export default EventCard;
// icon = {<img className = "plus-image" src = "/icons/addImage.svg"/>}
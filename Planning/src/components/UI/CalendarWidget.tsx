import { format } from 'date-fns';
import EventCard from './EventComponent';
import './CalendarWidget.scss';
const TodayDate = () => {
  const today: Date = new Date();
  const formattedDate: string = format(today, 'd MMMM yyyy');
  return (
    <div className = "calendar-main-window">
      <h2 className = "date">{formattedDate}</h2>
      <EventCard></EventCard>
    </div>
  );
}
export default TodayDate;

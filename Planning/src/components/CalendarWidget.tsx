import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import EventCard from "./UI/EventCard";
import FormEvent from "./formEvent/FormEvent";
import "./CalendarWidget.scss";
const TodayDate = () => {
  const today: Date = new Date();
  const formattedDate: string = format(today, "d MMMM yyyy", {
    locale: ruLocale,
  });
  return (
    <div className="calendar-main-window">
      <p className="date">{formattedDate}</p>
      <EventCard></EventCard>
      <FormEvent />
    </div>
  );
};
export default TodayDate;

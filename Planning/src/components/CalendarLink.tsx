import './CalendarLink.scss'
const CalendarRedirectLink = () => {
    const redirectYandexPost = () => {
        const redirectUrl = 'https://calendar.yandex.ru';
        window.open(redirectUrl);
    };
    return (
        <div className="calendarLink">
            <a 
            onClick={redirectYandexPost}>
                <img src="/icons/calendarIcon.svg"></img>
                <p className="calendarLabel">Я-календарь</p>
            </a>
        </div>
    );

};

export {CalendarRedirectLink};


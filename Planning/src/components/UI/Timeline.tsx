import { useState, useEffect, memo, RefObject } from 'react';
import { Event } from '../../store/calendarApi/eventsApi';
const Timeline = memo(
    ({
        eventList,
        eventIdToNode,
        eventsContainer,
    }: {
        eventList: Event | null;
        eventIdToNode: RefObject<Record<string, HTMLElement | null>>;
        eventsContainer: React.MutableRefObject<HTMLDivElement | null>;
    }) => {
        const [currTime, setCurrTime] = useState(new Date());
        const [topPosition, setTopPosition] = useState(0);

        const getCurrentEvent = (currentTime: Date) => {
            if (!eventList) return null;
            const currentEvent = Object.entries(eventList).find(
                ([_, { start_time, end_time }]) => {
                    const startTime = new Date(start_time);
                    const endTime = new Date(end_time);

                    return (
                        currentTime.getTime() >= startTime.getTime() &&
                        currentTime.getTime() <= endTime.getTime()
                    );
                }
            );
            return currentEvent;
        };

        const getNextEvent = (currentTime: Date) => {
            if (!eventList) return null;
            const currentEvent = Object.entries(eventList).find(
                ([_, { start_time, end_time }]) => {
                    const startTime = new Date(start_time);
                    const endTime = new Date(end_time);

                    return (
                        currentTime.getTime() < startTime.getTime() &&
                        currentTime.getTime() < endTime.getTime()
                    );
                }
            );
            return currentEvent;
        };

        const getTimelinePosition = (date: Date) => {
            const currentEvent = getCurrentEvent(date);

            if (!currentEvent) {
                return getNextPosition(date);
            }

            const [eventId, { start_time, end_time }] = currentEvent;
            const eventBlock = eventIdToNode.current?.[eventId];

            if (!eventBlock) return 0;

            const startDate = new Date(start_time);
            const endDate = new Date(end_time);

            const blockHeight = eventBlock.clientHeight;

            const currentTimeSpan = date.getTime() - startDate.getTime();
            const eventTimeSpan = endDate.getTime() - startDate.getTime();

            const blockStartOffset =
                blockHeight * (currentTimeSpan / eventTimeSpan);

            // console.log({
            //     currentEvent,
            //     offset: eventBlock.offsetTop,
            //     blockStartOffset,
            //     eventBlock,
            //     fraction: currentTimeSpan / eventTimeSpan,
            // });

            return eventBlock.offsetTop + blockStartOffset;
        };

        const getNextPosition = (date: Date) => {
            const nextEvent = getNextEvent(date);

            if (!nextEvent) {
                return (eventsContainer.current?.scrollHeight ?? 0) - 10;
            }

            const [eventId, {}] = nextEvent;
            const eventBlock = eventIdToNode.current?.[eventId];

            if (!eventBlock) return 0;
            const blockHeight = eventBlock.clientHeight;
            return eventBlock.offsetTop - (blockHeight / 3 - blockHeight / 6); //только для отступа в 42px.
        };

        useEffect(() => {
            const timer = setInterval(() => {
                const date = new Date();
                const position = getTimelinePosition(date);
                setTopPosition(position);
                setCurrTime(date);
                // console.log({ position });
            }, 30000);

            return () => {
                clearInterval(timer);
            };
        }, [eventList]);

        const formattedTime = currTime.toLocaleTimeString('ru-RU', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        });

        return (
            <div
                className="timeline-container"
                style={{
                    top: 0,
                    transform: `translateY(calc(${topPosition}px - 100%))`,
                }}
            >
                <div className="timeline-current-time">{formattedTime}</div>
                <div className="timeline"></div>
            </div>
        );
    }
);

export default Timeline;

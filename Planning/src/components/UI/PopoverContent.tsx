import { Event } from '../../store/calendarApi/eventsApi';
import { EditOutlined } from '@ant-design/icons';
import { Issue } from '../../store/jiraApi/issueApi';
import { memo } from 'react';
export const PopoverContentEvent = memo(({ event }: Event) => {
    return (
        <div className="info-wrapper">
            <a href={event.url} className="info-wrapper-url" target="_blank">
                <EditOutlined className="info-wrapper-edit-btn" />
            </a>
            <h2 className="event-status">{event.title}</h2>
            <p className="event-time">
                {event.start_time.slice(11, 16)}-{event.end_time.slice(11, 16)}
            </p>
            <div className="info-wrapper-description-wrapper">
                <p className="event-reminder">{event.description}</p>
            </div>
        </div>
    );
});

export const PopoverContentJira = memo(
    ({ issue, pathImg }: { issue: Issue; pathImg: string }) => {
        return (
            <div className="popover-container">
                <h1 className={`title ${issue.priority.name.toLowerCase()}`}>
                    {issue.title}
                </h1>
                <div className="popover-container_status">
                    <p className="badge popover-badge">
                        {issue.story_points ?? '-'}
                    </p>
                    <img src={pathImg} />
                </div>
                <div className="popover-container-desc">
                    <p className="description">Описание задачи:</p>
                    <p className="description">{issue.description ?? '-'}</p>
                    <div>
                        {issue.subtasks.map((task, index) => (
                            <div key={index} className="task-item">
                                <p className="description">[{task.title}]</p>
                                <p className="description">
                                    {task.description ? -task.description : ''}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);

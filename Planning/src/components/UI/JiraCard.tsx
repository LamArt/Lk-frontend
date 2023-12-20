import { Popover } from 'antd';
import { Task } from '../JiraWidget';
import './JiraCard.scss';

const prioritySrc = {
    highest: '/jira_icons/highest.svg',
    high: '/jira_icons/high.svg',
    medium: '/jira_icons/medium.svg',
    lowest: '/jira_icons/low.svg',
    low: '/jira_icons/lowest.svg',
};

const JiraCard = ({ task }: { task: Task }) => {
    const content = (
        <div className="popover-container">
            <h1
                className={`title ${
                    task.priority == 'highest' || task.priority == 'high'
                        ? 'high'
                        : task.priority == 'low' || task.priority == 'lowest'
                        ? 'low'
                        : 'medium'
                }`}
            >
                {task.title}
            </h1>
            <div className="popover-container_status">
                <p className="badge popover-badge">{task.status}</p>
                <img src={prioritySrc[task.priority]} />
            </div>
            <p className="description">{task.description}</p>
        </div>
    );
    return (
        <Popover placement="bottom" content={content} trigger="click">
            <div
                style={{
                    width: '703px',
                    height: '121px',
                    borderRadius: '24px',
                    background: '#fff',
                    color: 'black',
                    display: 'flex',
                    margin: '0 auto',
                    marginBottom: '12px',
                    cursor: 'pointer',
                }}
            >
                <img
                    className="image"
                    src={prioritySrc[task.priority]}
                    width={20}
                ></img>
                <div className="info">
                    <div className="title_container">
                        <h3
                            className={`title limit ${
                                task.status >= 4
                                    ? 'high'
                                    : task.status == 3
                                    ? 'medium'
                                    : 'low'
                            }`}
                        >
                            {task.title}
                        </h3>
                        <p className="badge">{task.status}</p>
                    </div>
                    <p className="description limit">{task.description}</p>
                </div>
            </div>
        </Popover>
    );
};
export default JiraCard;

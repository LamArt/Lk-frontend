import { Popover } from 'antd';
import './JiraCard.scss';
import { Issues } from '../../store/jiraApi/issueApi';

const prioritySrc = {
    Highest: '/jira_icons/highest.svg',
    High: '/jira_icons/high.svg',
    Medium: '/jira_icons/medium.svg',
    Lowest: '/jira_icons/low.svg',
    Low: '/jira_icons/lowest.svg',
};

const JiraCard = ({ task }: { task: Issues }) => {
    const content = (
        <div className="popover-container">
            <h1
                className={`title ${
                    task.priority.name == 'Highest' ||
                    task.priority.name == 'High'
                        ? 'High'
                        : task.priority.name == 'Low' ||
                          task.priority.name == 'Lowest'
                        ? 'Low'
                        : 'Medium'
                }`}
            >
                {task.title}
            </h1>
            <div className="popover-container_status">
                <p className="badge popover-badge">5</p>
                <img src={prioritySrc[task.priority.name]} />
            </div>
            <div className="popover-container-desc">
                <p className="description">Описание задачи:</p>
                <p className="description">{task.description ?? '-'}</p>
            </div>
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
                    src={prioritySrc[task.priority.name]}
                    width={20}
                ></img>
                <div className="info">
                    <div className="title_container">
                        <h3 className={`title limit ${task.priority.name}`}>
                            {task.title}
                        </h3>
                        <p className="badge">5</p>
                    </div>
                    <p className="description limit">{task.description}</p>
                </div>
            </div>
        </Popover>
    );
};
export default JiraCard;

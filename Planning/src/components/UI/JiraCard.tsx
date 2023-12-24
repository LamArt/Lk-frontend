import { Popover } from 'antd';
import './JiraCard.scss';
import { Issue } from '../../store/jiraApi/issueApi';
import { PopoverContentJira } from './PopoverContent';

const prioritySrc = {
    Highest: '/jira_icons/highest.svg',
    High: '/jira_icons/high.svg',
    Medium: '/jira_icons/medium.svg',
    Lowest: '/jira_icons/low.svg',
    Low: '/jira_icons/lowest.svg',
};

const JiraCard = ({ task }: { task: Issue }) => {
    return (
        <Popover
            placement="bottom"
            content={
                <PopoverContentJira
                    issue={task}
                    pathImg={prioritySrc[task.priority.name]}
                />
            }
            trigger="click"
        >
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
                <div className="info-issue">
                    <div className="title_container">
                        <h3
                            className={`title limit ${task.priority.name.toLowerCase()}`}
                        >
                            {task.title}
                        </h3>
                        <p className="badge">{task.story_points ?? '-'}</p>
                    </div>
                    <p className="description limit">
                        {task.description ?? '-'}
                    </p>
                </div>
            </div>
        </Popover>
    );
};
export default JiraCard;

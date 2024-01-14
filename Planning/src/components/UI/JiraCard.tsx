import { Popover } from 'antd';
import './JiraCard.scss';
import { Issue } from '../../store/jiraApi/issueApi';
import { PopoverContentJira } from './PopoverContent';

import Highest from '../../assets/highest.svg';
import High from '../../assets/high.svg';
import Medium from '../../assets/medium.svg';
import Low from '../../assets/low.svg';
import Lowest from '../../assets/lowest.svg';

const prioritySrc = {
    Highest: Highest,
    High: High,
    Medium: Medium,
    Lowest: Low,
    Low: Lowest,
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
                    width: '36vw',
                    height: '12vh',
                    borderRadius: '1.2vw',
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

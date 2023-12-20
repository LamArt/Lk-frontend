import './JiraWidget.scss';
import JiraCard from './UI/JiraCard';
export type Task = {
    title: string;
    status: number;
    description: string;
    id: number;
    priority: 'highest' | 'high' | 'medium' | 'lowest' | 'low';
};

const tasks: Task[] = [
    {
        title: 'Очень приоритетная задача',
        status: 5,
        description:
            'это очень очень длинное описание задачи очень очень длинное очень очень',
        id: 1,
        priority: 'highest',
    },
    {
        title: 'Приоритетная задача',
        status: 4,
        description: 'Описание задачи',
        id: 2,
        priority: 'high',
    },
    {
        title: 'Менее приоритетная задача',
        status: 3,
        description:
            'это очень очень длинное описание задачи очень очень длинное очень очень',
        id: 3,
        priority: 'medium',
    },
    {
        title: 'Не приоритетная задача',
        status: 2,
        description:
            'это очень очень длинное описание задачи очень очень длинное очень очень',
        id: 4,
        priority: 'low',
    },
    {
        title: 'Совсем не приоритетная задача',
        status: 1,
        description:
            'это очень очень длинное описание задачи очень очень длинное очень очень',
        id: 5,
        priority: 'lowest',
    },
    {
        title: 'Совсем не приоритетная задача',
        status: 1,
        description:
            'это очень очень длинное описание задачи очень очень длинное очень очень',
        id: 6,
        priority: 'lowest',
    },
];

const JiraWidget = () => {
    return (
        <div className="jira-window-container">
            <div className="jira-tasks-container">
                {' '}
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <JiraCard task={task}></JiraCard>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default JiraWidget;

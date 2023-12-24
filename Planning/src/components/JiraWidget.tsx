import './JiraWidget.scss';
import JiraCard from './UI/JiraCard';
import { useGetIssuesQuery, Issue } from '../store/jiraApi/issueApi';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

const JiraWidget = () => {
    const { data, refetch, isLoading } = useGetIssuesQuery();
    const [issuesList, setIssuesList] = useState<Issue[]>([]);
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                await refetch();
                if (data !== undefined) {
                    setIssuesList(data);
                    console.log(Object.entries(data));
                }
            } catch (error) {
                console.log('Error post data:', error);
            }
        };
        fetchIssues();
        const intervalId = setInterval(() => {
            fetchIssues();
        }, 300000); //поменять

        return () => clearInterval(intervalId);
    }, [data, refetch]);
    return (
        <div className="jira-window-container">
            <div className="jira-tasks-container">
                {isLoading ? (
                    <Spin size="large" style={{ margin: 'auto' }} />
                ) : issuesList === null ? (
                    <p
                        className="description"
                        style={{
                            margin: 'auto',
                            color: '$grey',
                            fontSize: 'large',
                        }}
                    >
                        Задач на спринт нет
                    </p>
                ) : (
                    <ul>
                        {Object.entries(issuesList).map((issue) => (
                            <li key={issue[0]}>
                                <JiraCard task={issue[1]}></JiraCard>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default JiraWidget;

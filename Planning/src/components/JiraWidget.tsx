import './JiraWidget.scss';
import JiraCard from './UI/JiraCard';
import { useGetIssuesQuery, Issues } from '../store/jiraApi/issueApi';
import { useEffect, useState } from 'react';

const JiraWidget = () => {
    const { data, refetch } = useGetIssuesQuery();
    const [issuesList, setIssuesList] = useState<Issues[]>();
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
                {issuesList ? (
                    <ul>
                        {Object.entries(issuesList).map((issue) => (
                            <li key={issue[0]}>
                                <JiraCard task={issue[1]}></JiraCard>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Задач на спринт нет</p>
                )}
            </div>
        </div>
    );
};

export default JiraWidget;

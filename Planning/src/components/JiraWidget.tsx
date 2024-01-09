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
        }, 300000); //5 минут

        return () => clearInterval(intervalId);
    }, [data, refetch]);
    return (
        <>
            <div className='jiraLink'>
                <a
                href = 'https://lamart.atlassian.net/jira/your-work' 
                target="_blank">
                    <img src = {"/icons/jiraIcon.svg"}></img> 
                    <p className='jiraLabel'>Jira</p>
                </a>
            </div>
            
            <div className="jira-window-container">
                <div className="jira-tasks-container">
                    {isLoading && <Spin size="large" style={{ margin: 'auto' }} />}

                    {!isLoading && !issuesList && (
                        <p
                            className="description"
                            style={{
                                margin: 'auto',
                                fontSize: '1.3rem',
                            }}
                        >
                            Задач на спринт нет
                        </p>
                    )}

                    {!isLoading && !!issuesList && (
                        <ul>
                            {Object.entries(issuesList).map(([id, task]) => (
                                <li key={id}>
                                    <JiraCard task={task}></JiraCard>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
        
    );
};

export default JiraWidget;

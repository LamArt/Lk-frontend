import './JiraWidget.scss';
import JiraCard from './UI/JiraCard';
import { useGetIssuesQuery, Issue, Error } from '../store/jiraApi/issueApi';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import JiraPopup from './UI/JiraPopup';
import jiraIcon from '../assets/jiraIcon.svg';

const JiraWidget = () => {
    const { data, refetch, isLoading, error } = useGetIssuesQuery();
    const [issuesList, setIssuesList] = useState<Issue[]>([]);
    const OAUTH_URL = String(import.meta.env.VITE_OAuth_Jira);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        if (
            (error as Error)?.status === 400 ||
            (error as Error)?.status === 401
        ) {
            setShowPopup(true);
        }
        const fetchIssues = async () => {
            try {
                await refetch();
                if (data !== undefined) {
                    setIssuesList(data);
                    setShowPopup(false);
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
            <div className="jiraLink">
                <a
                    href="https://lamart.atlassian.net/jira/your-work"
                    target="_blank"
                >
                    <img src={jiraIcon}></img>
                    <p className="jiraLabel">Jira</p>
                </a>
            </div>

            <div className="jira-window-container">
                <div className="jira-tasks-container">
                    {data === undefined && showPopup && !isLoading && (
                        <JiraPopup onAuthorize={() => window.open(OAUTH_URL)} />
                    )}
                    {isLoading && (
                        <Spin size="large" style={{ margin: 'auto' }} />
                    )}

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

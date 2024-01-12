import './JiraWidget.scss';
import JiraCard from './UI/JiraCard';
import {
    useGetIssuesQuery,
    Issue,
    useGetJiraTokenMutation,
    Error,
} from '../store/jiraApi/issueApi';
import { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import JiraPopup from './UI/JiraPopup';
const JiraWidget = () => {
    const { data, refetch, isLoading, error } = useGetIssuesQuery();
    const [issuesList, setIssuesList] = useState<Issue[]>([]);
    const OAUTH_URL = String(import.meta.env.VITE_OAuth_Jira);
    const [showPopup, setShowPopup] = useState(false);
    const [mutation] = useGetJiraTokenMutation();
    const location = useLocation();
    const getCodeFromUrl = useCallback(() => {
        const url = new URL(
            location.pathname + location.search,
            window.location.origin
        );
        const code = url.searchParams.get('code');
        return code;
    }, [location]);

    const getJiraToken = useCallback(
        async (code: string) => {
            const cookies = new Cookies();

            const responce = await mutation({ authorization_code: code });
            if (responce !== undefined && 'data' in responce) {
                setShowPopup(false);
                cookies.set('jira_access_token', responce.data.access);
            }
        },
        [location]
    );

    useEffect(() => {
        const code = getCodeFromUrl();
        if (code) {
            getJiraToken(code);
        }
    }, [getCodeFromUrl]);

    useEffect(() => {
        if (
            (error as Error)?.status === 400 ||
            (error as Error)?.status === 401
        ) {
            setShowPopup(true);
        }
        if (data !== undefined) {
            setIssuesList(data);
        }
    }, [isLoading, error, refetch]);
    return (
        <>
            <div className="jiraLink">
                <a
                    href="https://lamart.atlassian.net/jira/your-work"
                    target="_blank"
                >
                    <img src={'/icons/jiraIcon.svg'}></img>
                    <p className="jiraLabel">Jira</p>
                </a>
            </div>

            <div className="jira-window-container">
                <div className="jira-tasks-container">
                    {data === undefined && showPopup && !isLoading && (
                        <JiraPopup
                            onAuthorize={() =>
                                (window.location.href = OAUTH_URL)
                            }
                        />
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

import React from 'react';
import { Flex, Button } from 'antd';
import Atlassian from './../../../public/jira_icons/Jira.svg';
import './JiraPopup.scss';

const JiraPopup: React.FC<{ onAuthorize: () => void }> = ({ onAuthorize }) => (
    <div className="planning-jira">
        <Flex
            justify={'center'}
            align={'center'}
            vertical
            gap="4rem"
            className="planning-jira-popup"
        >
            <div className="planning-jira-popup-title">
                Авторизуйтесь для продолжения
            </div>
            <Button
                onClick={onAuthorize}
                className="planning-jira-popup-button"
            >
                Авторизоваться
                <img
                    src={Atlassian}
                    alt={'Atlassian icon'}
                    className="planning-jira-popup-image"
                />
            </Button>
        </Flex>
    </div>
);

export default JiraPopup;

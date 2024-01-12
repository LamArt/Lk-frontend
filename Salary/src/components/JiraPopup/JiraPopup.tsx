import React from "react";
import { Flex, Button } from "antd";
import Atlassian from "../../assets/Jira.svg";
import './JiraPopup.scss'

const JiraPopup: React.FC<{ onAuthorize: () => void }> = ({ onAuthorize }) => (
    <div className='salary-jira'>
        <Flex justify={"center"} align={"center"} vertical gap='75rem' className='salary-jira-popup'>
            <div className='salary-jira-popup-title'>
                Авторизуйтесь для продолжения
            </div>
            <Button onClick={onAuthorize} className='salary-jira-popup-button'>
                Авторизоваться
                <img src={Atlassian} alt={'Atlassian icon'} className='salary-jira-popup-image'/>
            </Button>
        </Flex>
    </div>
);

export default JiraPopup;
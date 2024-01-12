import './Planning.scss';
import CalendarWidget from '../components/CalendarWidget.tsx';
import { Flex, Layout } from 'antd';
import ButtonMail from '../components/Button';
import JiraWidget from '../components/JiraWidget.tsx';
import Menu from "host/Menu";

export default function Planning() {
    return (
        <>
            <Menu />
            <Layout className="planning">
                <Layout.Content className="planning-content">
                    <Flex className="planning-content-container" vertical>
                        <ButtonMail></ButtonMail>
                        <div
                            style={{
                                display: 'flex',
                                gap: '0 3rem',
                            }}
                        >
                            <CalendarWidget></CalendarWidget>
                            <JiraWidget></JiraWidget>
                        </div>
                    </Flex>
                </Layout.Content>
            </Layout>
        </>
    );
}

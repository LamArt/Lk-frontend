import './Planning.scss';
import CalendarWidget from '../components/CalendarWidget.tsx';
import { Flex, Layout } from 'antd';
import ButtonMail from '../components/Button';
import { CalendarRedirectLink } from '../components/CalendarLink.tsx';

export default function Planning() {
    return (
        <Layout className="planning">
            <Layout.Content className="planning-content">
                <Flex className="planning-content-container" vertical>
                    <ButtonMail></ButtonMail>
                    <CalendarRedirectLink></CalendarRedirectLink>
                    <CalendarWidget></CalendarWidget>
                </Flex>
            </Layout.Content>
        </Layout>
    );
}

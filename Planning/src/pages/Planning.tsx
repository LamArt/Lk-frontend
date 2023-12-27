import './Planning.scss';
import CalendarWidget from '../components/CalendarWidget.tsx';
import { Flex, Layout } from 'antd';
import ButtonMail from '../components/Button';
import { RedirectLink } from '../components/RedirectLink.tsx';

export default function Planning() {
    return (
        <Layout className="planning">
            <Layout.Content className="planning-content">
                <Flex className="planning-content-container" vertical>
                    <ButtonMail></ButtonMail>
                    <div style={{
                        marginLeft: '730px',
                        position: 'absolute',
                        marginTop: '123px',
                        zIndex: 2,
                    }}><RedirectLink serviceUrl = 'https://calendar.yandex.ru' pathImg="/icons/calendarIcon.svg" title="Я-календарь"></RedirectLink></div>
                    <CalendarWidget></CalendarWidget>
                </Flex>
            </Layout.Content>
        </Layout>
    );
}

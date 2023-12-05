import './Planning.scss';
import TodayDate from '../components/CalendarWidget.tsx';
import { Button, Flex, Layout } from 'antd';
import ButtonMail from '../components/Button';

export default function Planning() {
  return (
    <Layout className="planning">
      <Layout.Content className="planning-content">
        <Flex className='planning-content-container' vertical>
          <ButtonMail></ButtonMail>
          <TodayDate></TodayDate>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

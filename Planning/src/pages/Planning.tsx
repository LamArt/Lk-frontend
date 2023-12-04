import './Planning.scss';
import TodayDate from '../components/CalendarWidget.tsx';
import { Button, Flex, Layout } from 'antd';
import ButtonMail from '../components/Button';

export default function Planning() {
  return (
    <Layout className="planning">
      <Layout.Content className="planning-content content">
        <Flex className="content-container" vertical>
          <TodayDate></TodayDate>
          <ButtonMail></ButtonMail>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

import { Layout, Flex } from "antd";
import TodayDate from "../components/UI/CalendarWidget.tsx";
export default function Planning() {
  return (
    <Layout>
      <Layout.Content className="planning-content content">
        <Flex className="content-container" vertical>
          <TodayDate></TodayDate>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

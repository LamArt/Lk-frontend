import "./Planning.scss";
import { Layout, Flex } from "antd";
import TodayDate from "../components/CalendarWidget.tsx";
export default function Planning() {
  return (
    <Layout className="planning">
      <Layout.Content className="planning-content content">
        <Flex className="content-container" vertical>
          <TodayDate></TodayDate>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

import { Flex, Layout } from "antd";
import "./Planning.scss";
import ButtonMail from "../components/Button";

export default function Planning() {
  return (
    <Layout className="planning">
      <Layout.Content className="planning-content content">
        <Flex vertical>
          <ButtonMail></ButtonMail>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

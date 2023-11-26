import { Button, Modal } from "antd";
import { Input } from "antd";
import { useState } from "react";
import {
  LinkOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./FormEvent.scss";
interface ContentProps {
  visible: boolean;
  onClose: () => void;
}
const EventInfo: React.FC<ContentProps> = ({ visible, onClose }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      mask={false}
      footer={null}
    >
      <div className="infoWrapper">
        <h3 className="fieldTitle">{"Мероприятие X"}</h3>
        <div className="fieldContainer info">
          <ClockCircleOutlined className="formIcon" />
          <p className="field">24.11.2023 18:00</p>
          <EditOutlined className="formIcon" />
          <p className="field">Встреча с коллегами</p>
          <LinkOutlined className="formIcon" />
          <p className="field">#link</p>
        </div>
      </div>
    </Modal>
  );
};
export default EventInfo;

import { Button, Modal } from "antd";
import { Input } from "antd";
import { useState } from "react";
import {
  LinkOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

import "./FormEvent.scss";

const FormEvent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
    <DatePicker showTime onChange={onChange} onOk={onOk} />;
  };

  return (
    <>
      <Button
        shape="circle"
        type="primary"
        className="buttonAddEvent"
        onClick={showModal}
      >
        <img className="plus-image" src="/icons/addImage.svg" />
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        className="modal"
        maskClosable={false}
        mask={false}
        footer={[
          <Button
            key="add"
            onClick={handleOk}
            type="primary"
            className="saveEvent"
          >
            Сохранить
          </Button>,
        ]}
      >
        <div className="formContainer">
          <form>
            <Input
              className="fieldTitle"
              placeholder="Добавьте название"
              bordered={false}
            />
            <div className="fieldContainer">
              <ClockCircleOutlined className="formIcon" />
              <Space direction="vertical">
                <div className="custom-datepicker">
                  <DatePicker
                    locale={locale}
                    showTime
                    bordered={false}
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Дата/время"
                    suffixIcon={null}
                  />
                </div>
              </Space>
              <EditOutlined className="formIcon" />
              <Input
                placeholder="Введите описание"
                bordered={false}
                className="field"
              />
              <LinkOutlined className="formIcon" />
              <Input
                placeholder="Прикрепить ссылку"
                bordered={false}
                className="field"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default FormEvent;

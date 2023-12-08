import { Button, Modal } from "antd";
import { Input } from "antd";
const { TextArea } = Input;
import { useState } from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

import locale from "antd/es/date-picker/locale/ru_RU";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

import "./FormEvent.scss";

const FormEvent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<null | string>(null);
  const [endDate, setEndDate] = useState<null | string>(null);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    console.log("Название:", title);
    console.log("Описание:", description);
    console.log("Дата начала:", startDate);
    console.log("Дата конца:", endDate);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [buttonDescriptionVisible, setButtonDescriptionVisible] = useState(true);

  const [buttonVieoEventVisible, setButtonVideoEventVisible] = useState(true);

  const [flag, setFlag] = useState(false);

  const handleClick = (button: string) => {
    if (flag === true) {
      setFlag(false);
    }
    setFlag(true);
    button == 'addDescription' ? setButtonDescriptionVisible(false) : setButtonVideoEventVisible(false);
  };  

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    if (Array.isArray(dateString) && dateString.length === 2) {
      setStartDate(dateString[0]);
      setEndDate(dateString[1]);
    }
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
    <DatePicker showTime onChange={onChange} onOk={onOk} />
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
            Создать
          </Button>,
        ]}
      >
        <div className="formContainer">
          <form>
            <h3 className="eventName">Новое мероприятие</h3>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              className="fieldTitle"
              placeholder="Название"
              bordered={true}
            />
            {buttonDescriptionVisible && (
              <Button
                className="addDescription"
                onClick={() => handleClick('addDescription')}
              >
                <img className="addEventButton" src="/icons/plus.svg"></img>
                <h3>Описание</h3>   
              </Button>
            )}
            {!buttonDescriptionVisible && (
              <TextArea 
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="fieldDescription"
              >
              </TextArea>
            )}
            {buttonVieoEventVisible && (
              <Button
                className={"addVideoMeeting"}
                onClick={() => handleClick('addViodeoMeeting')}
              >
              <img className="addEventButton" src="/icons/telemost.png"></img>
              <h3>Добавить видеовстречу</h3>   
            </Button>
            )}
            {!buttonVieoEventVisible && (
              <Button
              className={"activeVideoMeeting"}
              disabled = {true}
              >
                <img className="addEventButton" src="/icons/telemost.png"></img>
                <h3>Ссылка на встречу будет в описании</h3>
              </Button>
              
            )}
            <div className="fieldContainer">
              <Space direction="vertical">
                <div className="custom-datepicker">
                  <RangePicker
                    locale={locale}
                    picker="date"
                    showTime
                    onChange={onChange}
                    onOk={onOk}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={["Дата начала", "Дата конца"]}
                    className="eventTime"
                  />
                </div>
              </Space>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default FormEvent;

import { useState } from 'react';
import { Input, Button, Modal, DatePicker, Space, Form } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import './FormEvent.scss';
import { usePostNewEventMutation } from '../../store/calendarApi/eventsApi';
import { useForm } from 'antd/es/form/Form';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormEvent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [btnDescVisible, setBtnDescVisible] = useState(true);
    const [btnMeetVisible, setBtnMeetVisible] = useState(true);
    const [isCreateMeet, setIsCreateMeet] = useState(false);
    const [eventForm] = usePostNewEventMutation({});
    const [form] = useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsCreateMeet(false);
        setBtnMeetVisible(true);
        setBtnDescVisible(true);
        // setStartDate('');
        // setEndDate('');
    };

    const addDescription = () => {
        setBtnDescVisible(false);
    };

    const addMeet = () => {
        setIsCreateMeet(true);
        setBtnMeetVisible(false);
    };

    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string
    ) => {
        if (Array.isArray(dateString) && dateString.length === 2) {
            setStartDate(dateString[0]);
            setEndDate(dateString[1]);
        }
    };

    const onOk = (
        value: DatePickerProps['value'] | RangePickerProps['value']
    ) => {
        <DatePicker showTime onChange={onChange} onOk={onOk} />;
    };
    const handleSubmit = async (values: {
        title: string;
        description: string;
    }) => {
        const formData = {
            title: values.title,
            description: values.description,
            start_time: startDate,
            end_time: endDate,
            create_conference: isCreateMeet,
        };
        console.log(formData);
        eventForm(formData);
        form.resetFields();
        // setStartDate('');
        // setEndDate('');
        setIsCreateMeet(false);
        setBtnMeetVisible(true);
        setBtnDescVisible(true);
    };

    return (
        <>
            <Button
                shape="circle"
                type="primary"
                className="buttonAddEvent"
                onClick={() => setIsModalOpen(true)}
            >
                <img
                    className="plus-image"
                    src="/icons/addImage.svg"
                    alt="Add Event"
                />
            </Button>
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                className="modal"
                maskClosable={false}
                mask={false}
                footer={null}
            >
                <div className="formContainer">
                    <Form form={form} onFinish={handleSubmit}>
                        <h3 className="eventName">Новое мероприятие</h3>
                        <Form.Item name="title">
                            <Input
                                placeholder="Название"
                                className="fieldTitle"
                            />
                        </Form.Item>
                        {btnDescVisible ? (
                            <Button
                                className="addDescription"
                                onClick={() => addDescription()}
                            >
                                <img
                                    className="addEventButton"
                                    src="/icons/plus.svg"
                                ></img>
                                <h3>Описание</h3>
                            </Button>
                        ) : (
                            <Form.Item name="description">
                                <TextArea
                                    rows={2}
                                    className="fieldDescription"
                                    name="description"
                                ></TextArea>
                            </Form.Item>
                        )}
                        {btnMeetVisible ? (
                            <Button
                                className={'addVideoMeeting'}
                                onClick={() => addMeet()}
                            >
                                <img
                                    className="addEventButton"
                                    src="/icons/telemost.png"
                                ></img>
                                <h3>Добавить видеовстречу</h3>
                            </Button>
                        ) : (
                            <Button
                                className={'activeVideoMeeting'}
                                disabled={true}
                            >
                                <img
                                    className="addEventButton"
                                    src="/icons/telemost.png"
                                ></img>
                                <h3>Ссылка на встречу будет в описании</h3>
                            </Button>
                        )}
                        <div className="fieldContainer">
                            <Form.Item className="custom-datepicker">
                                <RangePicker
                                    locale={locale}
                                    picker="date"
                                    showTime
                                    onChange={onChange}
                                    onOk={onOk}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['Дата начала', 'Дата конца']}
                                    className="eventTime"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button
                                key="add"
                                type="primary"
                                className="saveEvent"
                                htmlType="submit"
                            >
                                Создать
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default FormEvent;

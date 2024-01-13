import { useState } from 'react';
import { Input, Button, Modal, DatePicker, Form, Flex } from 'antd';
import CloseOutlined from '@ant-design/icons';
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
    const [attendeesList, setAttendeesList] = useState<string[]>([]);
    const [inputText, setInputText] = useState('');
    const [email, setEmail] = useState<string>('');
    const [form] = useForm();

    const handleCancel = () => {
        setAttendeesList([]);
        form.resetFields();
        setIsModalOpen(false);
        setIsCreateMeet(false);
        setBtnMeetVisible(true);
        setBtnDescVisible(true);
    };

    const addDescription = () => {
        setBtnDescVisible(false);
    };

    const addMeet = () => {
        setIsCreateMeet(true);
        setBtnMeetVisible(false);
    };

    const changeEmail = (mail: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(mail.target.value);
    };

    const addEmail = () => {
        if (email.trim() !== '') {
            setAttendeesList([...attendeesList, email]);
            setEmail('');
        }
    };

    const onChange = (
        _value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string
    ) => {
        if (Array.isArray(dateString) && dateString.length === 2) {
            setStartDate(dateString[0]);
            setEndDate(dateString[1]);
        }
    };

    const onOk = (
        _value: DatePickerProps['value'] | RangePickerProps['value']
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
            attendees: attendeesList,
        };
        setAttendeesList([]);
        eventForm(formData);
        form.resetFields();
        setIsCreateMeet(false);
        setBtnMeetVisible(true);
        setBtnDescVisible(true);
        setIsModalOpen(false);
    };

    const [hoveredItemIndex, setHoveredItemIndex] = useState<number>(NaN);

    const handleMouseEnter = (index: number) => {
        setHoveredItemIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredItemIndex(NaN);
    };

    const handleDeleteItem = (index: number) => {
        const updatedItems = [...attendeesList];
        updatedItems.splice(index, 1);
        setAttendeesList(updatedItems);
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
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите название встречи',
                                },
                            ]}
                        >
                            <Input
                                name="title"
                                placeholder="Название"
                                className="fieldTitle"
                                autoComplete="off"
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
                            <Form.Item
                                name="dateRange"
                                className="custom-datepicker"
                                rules={[
                                    {
                                        type: 'array',
                                        required: true,
                                        message: 'Введите диапазон дат',
                                    },
                                ]}
                            >
                                <RangePicker
                                    name="dateRange"
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
                        <h3 className="attendeesTitle">Участники</h3>
                        <div className="mails-container">
                            {attendeesList.map((att, index) => (
                                <div
                                    className="mail-wrapper"
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <p key={index}>{att}</p>
                                    {hoveredItemIndex === index && (
                                        <span
                                            onClick={() =>
                                                handleDeleteItem(index)
                                            }
                                            className="delete-icon"
                                        >
                                            <img src="/icons/delete.svg" />
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Form.Item
                            name="attendees"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Введите корректный email',
                                },
                            ]}
                        >
                            <Flex gap="small" className="attendees-wrapper">
                                <Input
                                    name="attendees"
                                    placeholder="lamart@yandex.ru"
                                    className="attendeesField"
                                    autoComplete="off"
                                    onChange={changeEmail}
                                ></Input>
                                <Button
                                    className="attendeesBtn"
                                    onClick={addEmail}
                                >
                                    Добавить
                                </Button>
                            </Flex>
                        </Form.Item>
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

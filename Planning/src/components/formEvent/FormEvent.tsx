import { FormEvent, useState } from 'react';
import { Button, Modal } from 'antd';
import { Input } from 'antd';
import { DatePicker, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import './FormEvent.scss';
import { usePostNewEventMutation } from '../../store/calendarApi/eventsApi';
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        // console.log('Название:', title);
        // console.log('Описание:', description);
        // console.log('Дата начала:', startDate);
        // console.log('Дата конца:', endDate);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClick = (button: string) => {
        if (isCreateMeet === true) {
            setIsCreateMeet(false);
        }
        setIsCreateMeet(true);
        button == 'addDescription'
            ? setBtnDescVisible(false)
            : setBtnMeetVisible(false);
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
        // console.log('onOk: ', value);
        <DatePicker showTime onChange={onChange} onOk={onOk} />;
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append('start_time', startDate);
        formData.append('end_time', endDate);
        formData.append('create_conference', isCreateMeet);
        const newEventData = {
            title: '',
            description: '',
            start_time: '',
            end_time: '',
            create_conference: false,
            ...Object.fromEntries(formData.entries()),
        };
        eventForm(newEventData);
        form.reset();
        setIsCreateMeet(false);
        setStartDate('');
        setEndDate('');
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
                footer={null}
            >
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <h3 className="eventName">Новое мероприятие</h3>
                        <Input
                            className="fieldTitle"
                            placeholder="Название"
                            bordered={true}
                            name="title"
                        />
                        {btnDescVisible && (
                            <Button
                                className="addDescription"
                                onClick={() => handleClick('addDescription')}
                            >
                                <img
                                    className="addEventButton"
                                    src="/icons/plus.svg"
                                ></img>
                                <h3>Описание</h3>
                            </Button>
                        )}
                        {!btnDescVisible && (
                            <TextArea
                                rows={2}
                                className="fieldDescription"
                                name="description"
                            ></TextArea>
                        )}
                        {btnMeetVisible ? (
                            <Button
                                className={'addVideoMeeting'}
                                onClick={() => handleClick('addViodeoMeeting')}
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
                            <Space direction="vertical">
                                <div className="custom-datepicker">
                                    <RangePicker
                                        locale={locale}
                                        picker="date"
                                        showTime
                                        onChange={onChange}
                                        onOk={onOk}
                                        format="YYYY-MM-DD HH:mm"
                                        placeholder={[
                                            'Дата начала',
                                            'Дата конца',
                                        ]}
                                        className="eventTime"
                                    />
                                </div>
                            </Space>
                        </div>
                        <Button
                            key="add"
                            onClick={handleOk}
                            type="primary"
                            className="saveEvent"
                            htmlType="submit"
                        >
                            Создать
                        </Button>
                        ,
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default FormEvent;

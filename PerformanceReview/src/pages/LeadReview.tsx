import { Button, Card, Flex, Form, Layout, Radio, Slider, Space } from "antd";
import DoubleFormLabel from "../components/UI/DoubleFormLabel";
import { sliderFields } from "../helpers/ReviewFormHelper";
import '../styles/Review.scss'
import RadarChart from "../components/UI/RadarChart";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { TeamleadFormData } from "../store/reviewApi/reviewApi";
import { useNavigate } from "react-router-dom";

export default function LeadReivew(){
    const [formData, setFormData] = useState<Partial<TeamleadFormData>>({
        team: 1,
        ...sliderFields.reduce((acc, curr) => ({...acc, [curr.fieldName]: 50}), {})
    })

    const navigate = useNavigate()

    return (
        <Layout className="review">
            <Layout.Header className='review-header header'>
                <Flex className='header-container' justify='center' align='center' gap='middle' vertical>
                    <h1 className='review-title'>Оцени коллег</h1>
                    <p className='review-text'>Постарайся быть объективым</p>
                </Flex>
            </Layout.Header>
            <Layout.Content className='review-content teamlead'>
                <Flex align='center' vertical style={{zIndex: 100}}>
                    {!!import.meta.env.DEV && <div className="review-radar">
                        <h2 className="review-chartLabel">Статистика качеств сотрудника</h2>
                        <RadarChart data={[45, 20, 90, 85]}/>
                    </div>}
                    <Form className='review-form lead' layout='vertical'>
                        {!!import.meta.env.DEV && sliderFields.map((field, i) => <Form.Item key={i}>
                            <DoubleFormLabel label={field.label} annotation={field.annotation}/>
                            <Slider
                                tooltip={{ open: false }}
                                value={formData[field.fieldName] as number}
                                onChange={(value) => setFormData(prevState => ({...prevState, [field.fieldName]: value}))}
                            />
                        </Form.Item>)}
                        <Form.Item label='Положительные отзывы' className="review-replies">
                            {replies.map(reply => <Card className="review-reply">{reply}</Card>)}
                        </Form.Item>
                        <Form.Item label='Что понравилось:'>
                            <TextArea
                                placeholder="Напиши навыки, которые могут помочь команде:"
                                rows={7}
                                value={formData.strengths}
                                onChange={(event) => setFormData(prevState => ({...prevState, strengths: event.target.value}))}
                            />
                        </Form.Item>
                        <Form.Item label='Области роста по мнению коллег' className="review-replies">
                            {replies.map(reply => <Card className="review-reply">{reply}</Card>)}
                        </Form.Item>
                        <Form.Item label='Что могло быть лучше:'>
                            <TextArea
                                placeholder="Напиши навыки, в которых ощущаешь нехватку:"
                                rows={7}
                                value={formData.weaknesses}
                                onChange={(event) => setFormData(prevState => ({...prevState, weaknesses: event.target.value}))}
                            />
                        </Form.Item>
                        <Form.Item>
                            <h2 className="review-label">Ваша оценка:</h2>
                            <Radio.Group onChange={(event) => setFormData(prev => ({...prev, summary: event.target.value}))} value={formData.summary}>
                                <Space direction="vertical">
                                    <Radio style={{fontSize: 18}} value={1}>Плохо (-)</Radio>
                                    <Radio style={{fontSize: 18}} value={2}>Могло быть лучше (+/-)</Radio>
                                    <Radio style={{fontSize: 18}} value={3}>Хорошо (+)</Radio>
                                    <Radio style={{fontSize: 18}} value={4}>Классно (++)</Radio>
                                    <Radio style={{fontSize: 18}} value={5}>Удивил (+++)</Radio>
                                    <Radio style={{fontSize: 18}} value={6}>Один из лучших (++++)</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Flex justify='space-between' align='center'>
                            <Button type='primary' className='review-save'>Сохранить</Button>
                            <Button type='primary' htmlType='submit' className='review-send' onClick={() => navigate('/performance/lead')}>Отправить</Button>
                        </Flex>
                    </Form>
                </Flex>
            </Layout.Content>
        </Layout>
    )
}

const replies = [
    'Хочу выразить свою искреннюю благодарность и признательность нашему коллеге, Ивану Иванову, за его профессионализм и усердие в работе. Иван отличается высоким уровнем ответственности и самоорганизации, всегда выполняет свои обязанности качественно и в срок.',
    'Хочу выразить свою искреннюю благодарность и признательность нашему коллеге, Ивану Иванову, за его профессионализм и усердие в работе. Иван отличается высоким уровнем ответственности и самоорганизации, всегда выполняет свои обязанности качественно и в срок.'
]
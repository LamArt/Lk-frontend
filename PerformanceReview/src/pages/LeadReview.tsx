import { Button, Card, Flex, Form, Layout, Slider } from "antd";
import DoubleFormLabel from "../components/UI/DoubleFormLabel";
import { sliderFields } from "../helpers/ReviewFormHelper";
import '../styles/Review.scss'
import RadarChart from "../components/UI/RadarChart";
import TextArea from "antd/es/input/TextArea";

export default function LeadReivew(){
    return (
        <Layout className="review">
            <Layout.Header className='review-header header'>
                <Flex className='header-container' justify='center' align='center' gap='middle' vertical>
                    <h1 className='review-title'>Оцени коллег</h1>
                    <p className='review-text'>Постарайся быть объективым</p>
                </Flex>
            </Layout.Header>
            <Layout.Content className='review-content'>
                <Flex align='center' vertical style={{zIndex: 100}}>
                    <div className="review-radar">
                        <h2 className="review-chartLabel">Статистика качеств сотрудника</h2>
                        <RadarChart data={[45, 20, 90, 85]}/>
                    </div>
                    <Form className='review-form lead' layout='vertical'>
                        {sliderFields.map((field, i) => <Form.Item key={i}>
                            <DoubleFormLabel label={field.label} annotation={field.annotation}/>
                            <Slider tooltip={{ open: false }}/>
                        </Form.Item>)}
                        <Form.Item label='Положительные отзывы' className="review-replies">
                            {replies.map(reply => <Card className="review-reply">{reply}</Card>)}
                        </Form.Item>
                        <Form.Item label='Ваше мнение'>
                            <TextArea placeholder="Напиши навыки, которые могут помочь команде:" rows={7}/>
                        </Form.Item>
                        <Form.Item label='Области роста по мнению коллег' className="review-replies">
                            {replies.map(reply => <Card className="review-reply">{reply}</Card>)}
                        </Form.Item>
                        <Form.Item label='Ваше мнение'>
                            <TextArea placeholder="Напиши навыки, в которых ощущаешь нехватку:" rows={7}/>
                        </Form.Item>
                        <Flex justify='space-between' align='center'>
                            <Button type='primary' className='review-save'>Сохранить</Button>
                            <Button type='primary' htmlType='submit' className='review-send'>Отправить</Button>
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
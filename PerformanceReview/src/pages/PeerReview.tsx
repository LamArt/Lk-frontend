import { Layout, Flex, Form, Slider, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import DoubleFormLabel from "../components/UI/DoubleFormLabel";
import { sliderFields, textAreaFields } from "../helpers/ReviewFormHelper";
import '../styles/Review.scss'

export default function PeerReview(){
    return (
        <Layout className='review'>
            <Layout.Header className='review-header header'>
                <Flex className='header-container' justify='center' align='center' gap='middle' vertical>
                    <h1 className='review-title'>Оцени коллег</h1>
                    <p className='review-text'>Постарайся быть объективым</p>
                </Flex>
            </Layout.Header>
            <Layout.Content className='review-content'>
                <Flex align='center' vertical style={{zIndex: 100}}>
                    <Form className='review-form' layout='vertical'>
                        {sliderFields.map((field, i) => <Form.Item key={i}>
                            <DoubleFormLabel label={field.label} annotation={field.annotation}/>
                            <Slider tooltip={{ open: false }}/>
                        </Form.Item>)}
                        {textAreaFields.map((field, i) => <Form.Item label={field.label} key={i}>
                            <TextArea className='review-textarea' placeholder={field.placeholder} rows={4}/>
                        </Form.Item>)}
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
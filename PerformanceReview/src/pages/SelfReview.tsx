import { Layout, Flex, Form, Button, Slider } from 'antd'
import '../styles/Review.scss';
import DoubleFormLabel from '../components/UI/DoubleFormLabel'
import TextArea from 'antd/es/input/TextArea'
import { selfTextAreaFields, sliderFields, textAreaFields } from '../helpers/ReviewFormHelper'
// import {useGetAllPostsQuery} from "../store/exampleApi/exampleApi";
import {usePostTeamleadFormMutation} from "../store/reviewApi/reviewApi";

export default function SelfReview(){
    const {data} = usePostTeamleadFormMutation()
    console.log(data)

    return (
        <Layout className='review'>
            <Layout.Header className='review-header header'>
                <Flex className='header-container' justify='center' align='center' gap='middle' vertical>
                    <h1 className='review-title'>Оцени себя</h1>
                    <p className='review-text'>Постарайся быть объективым</p>
                </Flex>
            </Layout.Header>
            <Layout.Content className='review-content'>
                <Flex align='center' vertical style={{zIndex: 100}}>
                    <Form className='review-form' layout='vertical'>
                        {sliderFields.map((field, i) => <Form.Item key={i}>
                            <DoubleFormLabel label={field.label} annotation={field.selfAnnotation}/>
                            <Slider tooltip={{ open: false }}/>
                        </Form.Item>)}
                        {[...selfTextAreaFields, ...textAreaFields].map((field, i) => <Form.Item label={field.label} key={i}>
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
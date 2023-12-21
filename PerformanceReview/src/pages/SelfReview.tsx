import { Layout, Flex, Form, Button, Slider } from 'antd'
import '../styles/Review.scss';
import DoubleFormLabel from '../components/UI/DoubleFormLabel'
import TextArea from 'antd/es/input/TextArea'
import { sliderFields, textAreaFields } from '../helpers/ReviewFormHelper'
import {
  EmployeeFormData,
  useGetEmployeeFormQuery, useGetProfileQuery,
  usePostEmployeeFormMutation
} from "../store/reviewApi/reviewApi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelfReview(){
    const [formData, setFormData] = useState<Partial<EmployeeFormData>>({
        team: 1,
        ...sliderFields.reduce((acc, curr) => ({...acc, [curr.fieldName]: 50}), {})
    })

    const navigate = useNavigate()

    const {data: profile} = useGetProfileQuery({})
    const [employeeForm] = usePostEmployeeFormMutation({})
    // const {teamleadForm} = useGetEmployeeFormQuery(profile)
    
    const saveDataHandle = async() => {
      await employeeForm({...formData, about: profile.id})
      navigate('/performance')
    }

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
                        {!!import.meta.env.DEV && sliderFields.map((field, i) =>
                          <Form.Item key={i}>
                            <DoubleFormLabel label={field.label} annotation={field.selfAnnotation}/>
                            <Slider
                                tooltip={{ open: false }}
                                value={formData[field.fieldName] as number}
                                onChange={(value) => setFormData(prevState => ({...prevState, [field.fieldName]: value}))}
                            />
                        </Form.Item>)}
                        {textAreaFields.map((field, i) => <Form.Item label={field.label} key={i}>
                            <TextArea
                                className='review-textarea'
                                placeholder={field.placeholder}
                                rows={4}
                                value={formData[field.fieldName]}
                                onChange={(event) => setFormData(prevState => ({...prevState, [field.fieldName]: event.target.value}))}
                            />
                        </Form.Item>)}
                        <Flex justify='space-between' align='center'>
                            <Button type='primary' className='review-save' onClick={() => console.log(formData)}>Сохранить</Button>
                            <Button onClick={saveDataHandle} type='primary' htmlType='submit' className='review-send'>Отправить</Button>
                        </Flex>
                    </Form>
                </Flex>
            </Layout.Content>
        </Layout>
    )
}
import { Layout, Flex, Form, Slider, Button } from 'antd'
import './SelfReview.scss'
import DoubleFormLabel from '../components/Form/DoubleFormLabel'
import TextArea from 'antd/es/input/TextArea'

export default function SelfReview(){
    return (
    <Layout className='selfReview'>
        <Layout.Header className='selfReview-header header'>
            <Flex className='header-container' justify='center' align='center' gap='middle' vertical>
                <h1 className='selfReview-title'>Оцени себя</h1>
                <p className='selfReview-text'>Постарайся быть объективым</p>
            </Flex>
        </Layout.Header>
        <Layout.Content className='selfReview-content'>
            <Flex align='center' vertical style={{zIndex: 100}}>
                <Form 
                    className='selfReview-form'
                    layout='vertical'
                >
                    {fields.map((field, i) => <Form.Item key={i}>
                        <DoubleFormLabel label={field.label} annotation={field.annotation}/>
                        <Slider/>
                    </Form.Item>)}
                    {textAreaFields.map((field, i) => <Form.Item label={field.label} key={i}>
                        <TextArea className='selfReview-textarea' placeholder={field.placeholder} rows={4}/>
                    </Form.Item>)}
                    <Flex justify='space-between' align='center'>
                        <Button type='primary' className='selfReview-save'>Сохранить</Button>                        
                        <Button type='primary' htmlType='submit' className='selfReview-send'>Отправить</Button>
                    </Flex>
                </Form>
            </Flex>
        </Layout.Content>
    </Layout>)
}

const fields: SliderFields[] = [
    {
        label: 'Продуктивность',
        annotation: 'Как быстро спавляешься с задачами?'
    },
    {
        label: 'Коммуникативность',
        annotation: 'Как тебе даётся общение с коллегами?'
    },
    {
        label: 'Инициатива',
        annotation: 'Насколько тебе интересен текущий проект?'
    },
    {
        label: 'Профессиональные навыки ',
        annotation: 'Насколько твои навыки соотносятся с проектом?'
    },
]

const textAreaFields: TextAreaFields[] = [
    {
        label: 'Достижения',
        placeholder: 'Напиши решения, которыми гордишься:'
    },
    {
        label: 'Как это было достигнуто?',
        placeholder: 'Качества или обстоятельства, которые позволили достичь этого:'
    },
    {
        label: 'Сильные стороны',
        placeholder: 'Напиши навыки, которые могут помочь команде::'
    },
    {
        label: 'Области роста',
        placeholder: 'Напиши навыки, в которых ощущаешь нехватку:'
    }
]

interface SliderFields {
    label: string,
    annotation: string,
}

interface TextAreaFields{
    label: string,
    placeholder: string
}
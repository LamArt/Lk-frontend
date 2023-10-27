import { Layout, Flex, Form, Slider } from 'antd'
import './SelfReview.scss'
import DoubleFormLabel from '../components/Form/DoubleFormLabel'

export default function SelfReview(){
    return (<Layout className='selfReview'>
        <Layout.Header className='selfReview-header header'>
            <Flex className='header-container' justify='center' align='center' gap='middle' vertical>
                <h1 className='selfReview-title'>Оцени себя</h1>
                <p className='selfReview-text'>Постарайся быть объективым</p>
            </Flex>
        </Layout.Header>
        <Layout.Content className='selfReview-content'>
            <Flex align='center' vertical>
                <Form 
                    className='selfReview-form'
                    layout='vertical'
                >
                    {fields.map(field => <Form.Item>
                        <DoubleFormLabel label={field.label} annotation={field.annotation}/>
                        <Slider/>
                    </Form.Item>)}
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

interface SliderFields {
    label: string,
    annotation: string,
}
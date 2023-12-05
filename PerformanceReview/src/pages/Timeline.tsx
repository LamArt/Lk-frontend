import { Button, Flex, Layout } from "antd";
import '../styles/Review.scss'
import '../styles/Timeline.scss'
import Card from "antd/es/card/Card";
import arrowIcon from '../assets/timeline-arrow-icon.svg'
import TimelineStage from "../components/UI/TimelineStage";
import { useNavigate } from "react-router-dom";

export default function Timeline(){
    const navigate = useNavigate();

    return (
        <Layout className="review">
            <Layout.Content className="review-content timeline">
                <Card className="timeline-card">
                    <Flex vertical className="timeline-container">
                        <p className="timeline-label">
                            <b>Performance review</b> — процедура, позволяющая объективно оценить текущие навыки работника: его сильные и слабые стороны, и дать обратную связь, чтобы помочь улучшить свои навыки.
                        </p>
                        <Flex align="top" justify="space-between">
                            {defaultStages.map((label, i) => <>
                                <TimelineStage
                                    orderNumber={i + 1} 
                                    label={label}
                                    active
                                />
                                {i !== defaultStages.length - 1 && <img src={arrowIcon} className="timeline-arrow"/>}
                            </>)} 
                        </Flex>
                        <Button className="timeline-link" onClick={() => navigate('self')}>Начать</Button>
                    </Flex>
                </Card>
            </Layout.Content>
        </Layout>
    )
}

const defaultStages: string[] = [
    'Оценка себя',
    'Оценка коллег',
    'Оценка менеджером',
    'Обсуждение финальной оценки',
    'Обратная связь'
]
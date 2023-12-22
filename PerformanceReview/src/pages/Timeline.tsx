import { Button, Flex, Layout } from "antd";
import '../styles/Review.scss'
import '../styles/Timeline.scss'
import Card from "antd/es/card/Card";
import arrowIcon from '../assets/timeline-arrow-icon.svg'
import TimelineStage from "../components/UI/TimelineStage";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
    Teammate,
    useGetEmployeeFormQuery,
    useGetProfileQuery,
    useGetTeammatesQuery
} from "../store/reviewApi/reviewApi";

export default function Timeline(){
    const navigate = useNavigate();
    const [currentStage, setCurrentStage] = useState<Stages>(Stages.Default)
    const {data: profile} = useGetProfileQuery({})
    const {data: teammatesData, isLoading: isLoadingTeammates} = useGetTeammatesQuery([])
    const {data: selfReviewForm, isLoading: isLoadingEmployeeForm} = useGetEmployeeFormQuery(profile)

    const teammates = teammatesData?.teammates
    
    const isLoading = useMemo(() => isLoadingEmployeeForm || isLoadingTeammates, [isLoadingEmployeeForm, isLoadingTeammates])

    useEffect(() => {
        let stage = Stages.Default;
        if(selfReviewForm){
            stage = Stages.Peer;
        }
        setCurrentStage(stage)
    }, [selfReviewForm])

    if(isLoading){
        return <></>
    }

    const addPeerReviewHandle = (id: string) => {
        setCurrentStage(Stages.Manager);
        navigate(`peer/${id}`)
    }

    return (
        <Layout className="review">
            <Layout.Content className="review-content timeline">
                <Card className="timeline-card">
                    <Flex vertical className="timeline-container">
                        {currentStage === Stages.Default && <>
                            <p className="timeline-label">
                                <b>Performance review</b> — процедура, позволяющая объективно оценить текущие навыки работника: его сильные и слабые стороны, и дать обратную связь, чтобы помочь улучшить свои навыки.
                            </p>
                            <Flex align="top" justify="space-between">
                            {stageNames.map((label, i) => <>
                                <TimelineStage
                                    orderNumber={i + 1} 
                                    label={label}
                                    active
                                    key={i}
                                />
                                {i !== stageNames.length - 1 && <img src={arrowIcon} className="timeline-arrow"/>}
                            </>)} 
                            </Flex>
                            <Button className="timeline-link" onClick={() => setCurrentStage(Stages.Self)}>Начать</Button>
                        </>}
                        {
                            currentStage > 0 && <>
                                <Flex align="top" justify="space-between">
                                    {stageNames.map((label, i) => <>
                                        <TimelineStage
                                            orderNumber={i + 1} 
                                            active={currentStage === i + 1}
                                            done={currentStage > i + 1}
                                            key={i}
                                        />
                                        {i !== stageNames.length - 1 && <div className="timeline-bar" style={{backgroundColor: currentStage > i + 1 ? '#888' : '#d9d9d9'}}/>}
                                    </>)}
                                </Flex> 
                                <p className="timeline-label centered">
                                    {stageDescriptions[currentStage - 1]}
                                </p>
                                {currentStage === Stages.Self && <Button className="timeline-link" onClick={() => navigate('self')}>Перейти</Button>} 
                                {currentStage === Stages.Peer &&
                                    <Flex className="timeline-teammates" align="center" wrap="wrap" gap='middle'>
                                        {teammates && teammates.map((teammate: Teammate) => (
                                            <Card className="timeline-teammate teammate" onClick={() => addPeerReviewHandle(teammate.username)}>
                                                <Flex vertical align="center">
                                                    <h3 className="teammate-name">{teammate.first_name} {teammate.last_name}</h3>
                                                    <p className="teammate-post">Разработчик мобильных приложений</p>
                                                </Flex>
                                            </Card>
                                        ))}
                                    </Flex>}
                            </>
                        }
                    </Flex>
                </Card>
            </Layout.Content>
        </Layout>
    )
}

const stageNames: string[] = [
    'Оценка себя',
    'Оценка коллег',
    'Оценка менеджером',
    'Обсуждение финальной оценки',
    'Обратная связь'
]

const stageDescriptions: React.ReactNode[] = [
    <><b>Оценка себя:</b> вы самостоятельно оцениваете свои достижения и навыки, чтобы понять, каких качеств вам не хватает.</>,
    <><b>Оценка коллег:</b> вы непредвзято оцениваете сильные и слабые стороны своих коллег, чтобы помочь им улучшить свои навыки.</>,
    <><b>Оценка менеджером:</b> менеджер суммирует оценку коллег и подводит итог вашей деятельности за ревьюируемый период. Выставляется первичная оценка.</>,
    <><b>Обсуждение финальной оценки:</b> вы самостоятельно оцениваете свои достижения и навыки, чтобы понять, каких качеств вам не хватает.менеджеры и тимлиды обсуждают финальные оценки сотрудников, чтобы сформировать итоги performance review.</>,
    <><b>Обратная связь:</b> скоро менеджер назначит вам встречу, где вы обсудите ваши успехи за ревьюируемый период.</>,
]

export enum Stages{
    Default,
    Self,
    Peer,
    Manager,
    Discussion,
    Feedback
}
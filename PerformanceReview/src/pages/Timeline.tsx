import {Button, Flex, Layout, Radio, Select} from "antd";
import '../styles/Review.scss'
import '../styles/Timeline.scss'
import Card from "antd/es/card/Card";
import arrowIcon from '../assets/timeline-arrow-icon.svg'
import TimelineStage from "../components/UI/TimelineStage";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
    EmployeeFormData,
    Teammate,
    useGetEmployeeFormQuery,
    useGetProfileQuery, useGetTeammatesFormsQuery,
    useGetTeammatesQuery
} from "../store/reviewApi/reviewApi";
import Menu from "host/Menu";


export default function Timeline(){
    const navigate = useNavigate();
    const [currentStage, setCurrentStage] = useState<Stages>(Stages.Default)
    const [selectedTeam, setSelectedTeam] = useState<string>('')

    const {data: profile} = useGetProfileQuery({})
    const {data: teammatesData, isLoading: isLoadingTeammates} = useGetTeammatesQuery()
    const {data: selfReviewForm, isLoading: isLoadingEmployeeForm} = useGetEmployeeFormQuery(profile)
    const {data: teammatesForms, isLoading: isLoadingTeammatesForms} = useGetTeammatesFormsQuery()

    const teammates = teammatesData?.teammates

    //TODO: isTeamlead как получать?
    const isTeamlead = useMemo(() => profile?.teams.PerformanceReview.is_team_lead, [profile])
    const timelineStages = useMemo(() => stages.filter((_, i) => !isTeamlead || i !== 2 && isTeamlead), [isTeamlead])
    const currentTimelineStage = useMemo(() => timelineStages.find((stage) => stage.num === currentStage) || timelineStages[0], [timelineStages, currentStage])
    const isLoading = useMemo(() => isLoadingEmployeeForm || isLoadingTeammates, [isLoadingEmployeeForm, isLoadingTeammates])


    useEffect(() => {
        let stage = Stages.Default;
        if(selfReviewForm && selfReviewForm.length !== 0){
            stage = Stages.Peer;
        }
        if(teammatesForms && teammates && teammates.every(teammate => (teammatesForms as EmployeeFormData[]).some(form => form.about === teammate.id))){
            stage = Stages.Manager
        }
        setCurrentStage(stage)
    }, [selfReviewForm, teammates, teammatesForms])

    if(isLoading){
        return <></>
    }

    const addPeerReviewHandle = (id: number) => {
        setCurrentStage(Stages.Manager);
        navigate(`peer/${id}`)
    }

    return (
        <Layout className="review">
            <Menu/>
            <Layout.Content className="review-content timeline">
                <Card className="timeline-card">
                    <Flex vertical className="timeline-container">
                        {currentStage === Stages.Default && <>
                            <p className="timeline-label">
                                <b>Performance review</b> — процедура, позволяющая объективно оценить текущие навыки работника: его сильные и слабые стороны, и дать обратную связь, чтобы помочь улучшить свои навыки.
                            </p>
                            <Flex align="top" justify="space-between">
                            {timelineStages.map((stage, i) => <>
                                <TimelineStage
                                    orderNumber={i + 1}
                                    label={stage.name}
                                    active
                                    key={i}
                                />
                                {i !== timelineStages.length - 1 && <img src={arrowIcon} className="timeline-arrow"/>}
                            </>)}
                            </Flex>
                            <Select
                                options={Object.entries(profile?.teams || {}).map(([name, team]) => ({
                                    label: name,
                                    value: name
                                }))}
                                style={{width: '40%', margin: '16px auto'}}
                                onChange={value => setSelectedTeam(value)}
                                value={selectedTeam}
                                placeholder={'Выберите команду'}
                            />
                            <Button className="timeline-link" onClick={() => setCurrentStage(Stages.Self)} disabled={!selectedTeam}>Начать</Button>
                        </>}
                        {
                            currentStage > 0 && <>
                                <Flex align="top" justify="space-between">
                                    {timelineStages.map((stage, i) => <>
                                        <TimelineStage
                                            orderNumber={i + 1}
                                            active={currentTimelineStage.num === stage.num}
                                            done={currentTimelineStage.num > stage.num}
                                            key={i}
                                        />
                                        {i !== timelineStages.length - 1 && <div className="timeline-bar" style={{backgroundColor: currentTimelineStage.num > stage.num ? '#888' : '#d9d9d9'}}/>}
                                    </>)}
                                </Flex>
                                <p className="timeline-label centered">
                                    {
                                        isTeamlead ?
                                            currentTimelineStage.teamleadDescription || currentTimelineStage.description :
                                            currentTimelineStage.description
                                    }
                                </p>
                                {currentStage === Stages.Self && <Button className="timeline-link" onClick={() => navigate('self')}>Перейти</Button>}
                                {currentStage === Stages.Peer &&
                                    (!isTeamlead ? <Flex className="timeline-teammates" align="center" wrap="wrap" gap='middle'>
                                        {teammates && teammates.map((teammate: Teammate) => (
                                            <Card
                                                className={[
                                                    "timeline-teammate",
                                                    "teammate",
                                                    (teammatesForms as EmployeeFormData[] || []).some(form => form.about === teammate.id) ?
                                                        'done' : ''
                                                ].join(' ')}
                                                onClick={() => addPeerReviewHandle(teammate.username)}
                                            >
                                                <Flex vertical align="center">
                                                    <h3 className="teammate-name">{teammate.first_name} {teammate.last_name}</h3>
                                                </Flex>
                                            </Card>
                                        ))}
                                        </Flex> :
                                        <Button className="timeline-link" onClick={() => navigate('lead')}>Перейти</Button>
                                    )
                                }
                                {currentStage === Stages.Discussion && isTeamlead === true &&
                                 <Button className="timeline-link" onClick={() => navigate('lead')}>Посмотреть мои оценки</Button>}
                                 {currentStage === Stages.Feedback && isTeamlead === true &&
                                 <Flex vertical align="center" justify="space-between" style={{height: '45%'}}>
                                    <Radio style={{fontSize: 18}}>Встреча проведена</Radio>
                                    <Button className="timeline-link" onClick={() => navigate('lead')}>Посмотреть мои оценки</Button>
                                 </Flex>}
                            </>
                        }
                    </Flex>
                </Card>
            </Layout.Content>
        </Layout>
    )
}


export enum Stages{
    Default,
    Self,
    Peer,
    Manager,
    Discussion,
    Feedback
}

const stages: Array<{name: string, description: React.ReactNode, teamleadDescription? : React.ReactNode, num: Stages}> = [
    {
        name: 'Оценка себя',
        description: <><b>Оценка себя:</b> вы самостоятельно оцениваете свои достижения и навыки, чтобы понять, каких качеств вам не хватает.</>,
        num: Stages.Self
    },
    {
        name: 'Оценка коллег',
        description: <><b>Оценка коллег:</b> вы непредвзято оцениваете сильные и слабые стороны своих коллег, чтобы помочь им улучшить свои навыки.</>,
        num: Stages.Peer
    },
    {
        name: 'Оценка менеджером',
        description: <><b>Оценка менеджером:</b> менеджер суммирует оценку коллег и подводит итог вашей деятельности за ревьюируемый период. Выставляется первичная оценка.</>,
        num: Stages.Manager
    },
    {
        name: 'Обсуждение финальной оценки',
        description: <><b>Обсуждение финальной оценки:</b> вы самостоятельно оцениваете свои достижения и навыки, чтобы понять, каких качеств вам не хватает.менеджеры и тимлиды обсуждают финальные оценки сотрудников, чтобы сформировать итоги performance review.</>,
        teamleadDescription: <><b>Обсуждение финальной оценки:</b> скоро вам придет письмо с датой встречи, на которой менеджеры и тимлиды обсуждают финальные оценки сотрудников, чтобы сформировать итоги performance review.</>,
        num: Stages.Discussion
    },
    {
        name: 'Обратная связь',
        description: <><b>Обратная связь:</b> скоро менеджер назначит вам встречу, где вы обсудите ваши успехи за ревьюируемый период.</>,
        teamleadDescription: <><b>Обратная связь:</b> время назначить индивидуальные встречи своим подопечным, чтобы обсудить их успехи за ревьюируемый период.</>,
        num: Stages.Feedback
    },

]

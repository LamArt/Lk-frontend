import {Button, Card, Flex, Layout, Spin} from "antd";
import './Salary.scss'
import {useCallback, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import {useGetJiraTokenMutation, useGetSalaryQuery} from "../store/Api/Salary.ts";
import Cookies from "universal-cookie";
import Atlassian from "../assets/Jira.svg";
import {Error} from "../interfaces/Error.ts";

export default function Salary(){
    const OAUTH_URL = String(import.meta.env.VITE_OAuth_Jira)

    const [showPopup, setShowPopup] = useState(false)

    const location = useLocation()
    const [mutation] = useGetJiraTokenMutation()
    const { data, isLoading, error } = useGetSalaryQuery()

    const getCodeFromUrl = useCallback(() => {
        const url = new URL(location.pathname + location.search, window.location.origin)
        const code = url.searchParams.get("code")
        return code
    }, [location])

    const getJiraToken = useCallback(async (code: string) => {
        const cookies = new Cookies();

        const responce = await mutation({ authorization_code: code })
        if (responce !== undefined && 'data' in responce) {
            setShowPopup(false)
            cookies.set('jira_access_token', responce.data.access)
        }
    }, [location])

    useEffect(() => {
        const code = getCodeFromUrl()
        if (code) {
            getJiraToken(code)
        }
    }, [getCodeFromUrl])

    useEffect(() => {
        if ((error as Error)?.status === 400) {
            setShowPopup(true)
        }
    }, [isLoading]);

    return (
        <Layout className='salary'>
            {
                data === undefined && showPopup &&
                <div className='salary-jira'>
                    <Flex justify={"center"} align={"center"} vertical gap='75rem' className='salary-jira-popup'>
                        <div className='salary-jira-popup-title'>
                            Авторизуйтесь для продолжения
                        </div>
                        <Button onClick={() => window.location.href = OAUTH_URL} className='salary-jira-popup-button'>
                            Авторизоваться
                            <img src={Atlassian} alt={'Atlassian icon'} className='salary-jira-popup-image'/>
                        </Button>
                    </Flex>
                </div>
            }
            <div className='salary-header'>
                <div className='salary-title'>Зарплата</div>
            </div>
            <Layout.Content className='salary-content'>
                <Flex justify='center' align='center'>
                    <Flex justify='space-between' align='center' className='salary-info'>
                        <Flex gap='24rem' style={{alignSelf: 'start'}}>
                            <Flex vertical justify='center' align='center' gap='10rem'>
                                <div className='salary-card-name'>Story Points</div>
                                <Card className='salary-card salary-card-without-info'>
                                    <Flex justify='center' align='center' vertical>
                                        <div className='salary-card-title'>
                                            {isLoading ? <Spin/> : <>{data?.story_points || 0}</>}
                                        </div>
                                    </Flex>
                                </Card>
                            </Flex>
                            <Flex vertical justify={"center"} align={"center"} gap='10rem'>
                                <div className='salary-card-name'>Ставка</div>
                                <Card className='salary-card'>
                                    <Flex justify={"center"} align={"center"} vertical>
                                        <div className='salary-card-title'>
                                            {isLoading ? <Spin/> : <>{data?.rate || 0}</>}
                                        </div>
                                        <div className='salary-card-info'>
                                            Рубли / Story Points
                                        </div>
                                    </Flex>
                                </Card>
                            </Flex>
                        </Flex>

                        <Flex vertical className='salary-result'>
                            <Flex className='salary-result-block' vertical justify={"center"} align={"center"} gap='10rem'>
                                <div  className='salary-card-name'>Результат</div>
                                <Card className='salary-card salary-result'>
                                    <Flex justify={"center"} align={"center"} vertical>
                                        <div className='salary-card-title'>
                                            {isLoading ? <Spin/> : <>{data?.salary || 0}</>}
                                        </div>
                                        <div className='salary-card-info'>
                                            Рублей
                                        </div>
                                    </Flex>
                                </Card>
                            </Flex>
                            <Card className='salary-reward-block'>
                                <Flex justify={"center"} align={"start"} vertical gap='15rem'>
                                    <Flex>
                                        <div className='salary-reward-name'>
                                            Премия:
                                        </div>
                                        <div className='salary-reward-number-reward'>
                                            {isLoading ? <Spin/> : <>{data?.reward || 0}</>} руб
                                        </div>
                                    </Flex>
                                    <Flex>
                                        <div className='salary-reward-name'>
                                            Долг компании:
                                        </div>
                                        <div className='salary-reward-number-credit'>
                                            -{isLoading ? <Spin/> : <>{data?.credit || 0}</>} руб
                                        </div>
                                    </Flex>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                </Flex>
            </Layout.Content>
        </Layout>
    )
}

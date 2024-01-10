import {Card, Flex, Layout, Select, Spin} from "antd";
import './Salary.scss'
import {useCallback, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import {useGetJiraTokenMutation, useGetSalaryQuery} from "../store/Api/Salary.ts";
import Cookies from "universal-cookie";
import {Error} from "../interfaces/Error.ts";
import SalaryGraph from "../components/SalaryGraph/SalaryGraph.tsx";
import JiraPopup from "../components/JiraPopup/JiraPopup.tsx";

export default function Salary(){
    const OAUTH_URL = String(import.meta.env.VITE_OAuth_Jira)

    const [showPopup, setShowPopup] = useState(false)

    const location = useLocation()
    const [mutation] = useGetJiraTokenMutation()
    const { data, isLoading, error } = useGetSalaryQuery()

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

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
        if ((error as Error)?.status === 400 || (error as Error)?.status === 401) {
            setShowPopup(true)
        }
    }, [isLoading, error]);

    return (
        <Layout className='salary'>
            {
                data === undefined && showPopup &&
                <JiraPopup onAuthorize={() => window.location.href = OAUTH_URL} />
            }
            <div className='salary-header'>
                <div className='salary-title'>Зарплата</div>
                <Select
                    defaultValue="Проект 1"
                    className='salary-select'
                    onChange={handleChange}
                    options={[
                        { value: 'Проект 1', label: 'Проект 1' },
                        { value: 'Проект 2', label: 'Проект 2' },
                        { value: 'Проект 3', label: 'Проект 3' },
                    ]}
                />
            </div>
            <Layout.Content className='salary-content'>
                <Flex vertical>
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
                        </Flex>
                    </Flex>
                    <Flex vertical justify='center' align='center' className='salary-info'>
                        <Flex>
                            <Flex vertical className='salary-animation' justify={"center"} align={"center"} gap='10rem'>
                                <div className='salary-card-name salary-final-card-name'>Итоговая сумма</div>
                                <Card className='salary-card salary-final-card salary-result'>
                                    <Flex justify={"center"} align={"center"} vertical>
                                        <div className='salary-card-title salary-final-card-title'>
                                            {isLoading ? <Spin/> : <>{data?.salary || 0}</>}
                                        </div>
                                        <div className='salary-card-info salary-final-card-info'>
                                            Рубли / Story Points
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
                                    <div className='salary-reward-info'>
                                        *Итоговая сумма посчитана без учета QA тестов
                                    </div>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                    <SalaryGraph/>
                </Flex>
            </Layout.Content>
        </Layout>
    )
}

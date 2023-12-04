import {Button, Card, Flex, Layout, Typography} from "antd";
import './Salary.scss'
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useGetJiraTokenMutation, useGetSalaryQuery} from "../store/Api/Profile.ts";
import Cookies from "universal-cookie";

export default function Salary(){
    const OAUTH_URL = String(import.meta.env.VITE_OAuth_Jira)

    const location = useLocation()
    const [mutation] = useGetJiraTokenMutation()
    const { data } = useGetSalaryQuery()

    const getCodeFromUrl = useCallback(() => {
        const url = new URL(location.pathname + location.search, window.location.origin)
        const code = url.searchParams.get("code")
        return code
    }, [location])

    const getJiraToken = useCallback(async (code: string) => {
        const cookies = new Cookies();

        const responce = await mutation({ authorization_code: code })
        if (responce !== undefined && 'data' in responce) {
            cookies.set('jira_refresh_token', responce.data.refresh)
            cookies.set('jira_access_token', responce.data.access)
        }
    }, [location])

    useEffect(() => {
        const code = getCodeFromUrl()
        if (code) {
            getJiraToken(code)
        }
    }, [getCodeFromUrl])


    return (
        <Layout className='salary'>
            <Layout.Header className='salary-header'>
                <Typography.Title className='salary-title' level={1}>Зарплата</Typography.Title>
            </Layout.Header>
            <Layout.Content className='salary-content'>
                <Flex justify='center' align='center'>
                    <Flex justify='space-between' align='center' className='salary-info'>
                        <Flex gap='24px'>
                            <Flex vertical justify='center' align='center'>
                                <Typography.Title level={1}>Разработка</Typography.Title>
                                <Card className='salary-card'>
                                    <Flex justify='center' align='center' vertical>
                                        <div className='salary-card-title'>
                                            {data?.story_points}
                                        </div>
                                        <div className='salary-card-info'>
                                            Story Points
                                        </div>
                                    </Flex>
                                </Card>
                            </Flex>
                            <Flex vertical justify={"center"} align={"center"}>
                                <Typography.Title level={1}>QA тесты</Typography.Title>
                                <Card className='salary-card'>
                                    <Flex justify={"center"} align={"center"} vertical>
                                        <div className='salary-card-title'>
                                            {data?.reward}
                                        </div>
                                        <div className='salary-card-info'>
                                            Story Points
                                        </div>
                                    </Flex>
                                </Card>
                            </Flex>
                            <Flex vertical justify={"center"} align={"center"}>
                                <Typography.Title level={1}>Ставка</Typography.Title>
                                <Card className='salary-card'>
                                    <Flex justify={"center"} align={"center"} vertical>
                                        <div className='salary-card-title'>
                                            {data?.credit}
                                        </div>
                                        <div className='salary-card-info'>
                                            Рубли / Story Points
                                        </div>
                                    </Flex>
                                </Card>
                            </Flex>
                        </Flex>

                        <Flex vertical justify={"center"} align={"center"}>
                            <Typography.Title level={1} className='text'>Результат</Typography.Title>
                            <Card className='salary-card salary-result'>
                                <Flex justify={"center"} align={"center"} vertical>
                                    <div className='salary-card-title'>
                                        {data?.salary}
                                    </div>
                                    <div className='salary-card-info'>
                                        Рублей
                                    </div>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                </Flex>
            </Layout.Content>
            <Button onClick={() => window.location.href = OAUTH_URL}>
                Connect with Jira
            </Button>
        </Layout>
    )
}

import axios from 'axios';
import {Button, Layout, message} from "antd";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useGetJiraTokenMutation, useGetProfileQuery, useGetSalaryQuery} from "../redux/Profile.ts";

export default function Jira(){
    const location = useLocation()
    const { data } = useGetSalaryQuery({})
    const { data: levil } = useGetProfileQuery({})
    const [mutation] = useGetJiraTokenMutation()

    console.log(data)
    console.log(levil)
    const OAUTH_URL = String(import.meta.env.VITE_OAuth_Jira)

    const getCodeFromUrl = useCallback(() => {
        const url = new URL(location.pathname + location.search, window.location.origin)
        const code = url.searchParams.get("code")
        return code
    }, [location])

    const getJiraToken = useCallback(async (code: string) => {
        const responce = await mutation({ authorization_code: code })
        if ('data' in responce) {
            localStorage.setItem('jira_refresh_token', responce.data.refresh_token)
            localStorage.setItem('jira_access_token', responce.data.access_token)
        } else {
            message.error('Не удалось подключить Jira')
        }
    }, [location])

    useEffect(() => {
        const code = getCodeFromUrl()
        if (code) {
            getJiraToken(code)
        }
    }, [getCodeFromUrl])

    function jiraHandler() {
        axios.post(
            OAUTH_URL,
        )
            .then(response => {
                window.location.href = response.request.responseURL
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <Layout>
            <Button onClick={() => jiraHandler()}>
                Connect with Jira
            </Button>
        </Layout>
    )
}

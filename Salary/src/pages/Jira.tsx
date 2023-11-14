import axios from 'axios';
import { Button, Layout } from "antd";
import {useCallback, useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function Jira(){
    const location = useLocation()
    const OAUTH_URL = String(import.meta.env.VITE_OAuth_Jira)

    const getCodeFromUrl = useCallback(() => {
        const url = new URL(location.pathname + location.search, window.location.origin)
        const code = url.searchParams.get("code")
        return code
    }, [location])

    useEffect(() => {
        const code = getCodeFromUrl()
        if (code) {
            console.log(code)
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

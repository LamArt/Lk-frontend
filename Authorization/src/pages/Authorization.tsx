import { useEffect } from 'react';
import {Button, Flex, Form, Layout } from 'antd';
import './Authorization.scss';
import { AuthButton } from "../components/AuthButton.ts";
import { useGetProfileMutation } from '../store/Auth.ts';

export default function Authorization() {
    const [mutation] = useGetProfileMutation({})
    useEffect(() => {
        if (!window.YaAuthSuggest) {
            AuthButton();
        }
    }, []);

    return (
        <Layout className="authorization">
            <Layout.Content className="authorization-content">
                <Flex className={'content-container'} justify="center" align="center" vertical>
                    <h1 className={'authorization-title'}>Авторизация</h1>
                    <Form className={'authorization-form'}>
                        <div id="buttonContainerId" className={'authorization-button'}></div>
                    </Form>
                    <p className={'authorization-text'}>Авторизация поможет вам сохранить ваши данные в безопасности</p>
                    <Button onClick={async () => {
                        const response = await mutation({})
                        if (!('error' in response)) {
                            console.log(response)
                        } else {
                            console.log('error')
                            console.log(response)
                        }
                    }}>
                        data
                    </Button>
                </Flex>
            </Layout.Content>
        </Layout>
    );
}
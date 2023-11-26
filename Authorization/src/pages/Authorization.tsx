import { useEffect } from 'react';
import { Flex, Form, Layout } from 'antd';
import './Authorization.scss';
import { AuthButton } from "../components/AuthButton.ts";

export default function Authorization() {
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
                </Flex>
            </Layout.Content>
        </Layout>
    );
}
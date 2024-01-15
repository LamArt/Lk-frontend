declare global {
    interface Window {
        YaAuthSuggest: {
            init: Function;
        };
    }
}

import Cookies from 'universal-cookie';

let scriptLoaded = false;
const cookies = new Cookies();

export function AuthButton() {
    if (!scriptLoaded) {
        scriptLoaded = true;

        const script = document.createElement('script');
        script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
        document.head.appendChild(script);

        script.onload = () => {
            const oauthQueryParams = {
                client_id: '10d277a8f80e40e5b973e36c9d34aa01',
                response_type: 'token',
                redirect_uri: 'https://lk.lamart.site/token',
            };

            window.YaAuthSuggest.init(
                oauthQueryParams,
                'https://lk.lamart.site/authorization',
                {
                    view: 'button',
                    parentId: 'buttonContainerId',
                    buttonSize: 'xxl',
                    buttonView: 'additional',
                    buttonTheme: 'light',
                    buttonBorderRadius: '12',
                    buttonIcon: 'ya',
                }
            )
                .then(({ handler }: { handler: () => void }) => handler())
                .then((data: any) => {
                    const postData = {
                        access_token: data.access_token,
                        refresh_token: "string",
                        expires_in: 0,
                        organisation: "lamart",
                        provider: "yandex",
                    };

                    fetch('https://lk.lamart.site/auth/exchange_token/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData),
                    })
                        .then(response => response.json())
                        .then(responseData => {
                            console.log('Ответ от сервера:', responseData);

                            window.location.href = 'https://lk.lamart.site/salary'
                            cookies.set('access_token', responseData.access);
                            cookies.set('refresh_token', responseData.refresh);
                        })
                        .catch(error => {
                            console.error('Ошибка при выполнении POST-запроса:', error);
                        });
                })
                .catch((error: any) => {
                    console.log('Обработка ошибки', error);
                });
        };
    }
}
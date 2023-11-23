// AuthButton.ts
declare global {
    interface Window {
        YaAuthSuggest: {
            init: Function;
        };
    }
}

let scriptLoaded = false;

export function AuthButton() {
    if (!scriptLoaded) {
        scriptLoaded = true;

        const script = document.createElement('script');
        script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
        document.head.appendChild(script);

        script.onload = () => {
            const oauthQueryParams = {
                client_id: 'c120ba35adaf4278a8277e542b1a0cbd',
                response_type: 'token',
                redirect_uri: 'http://localhost:5002/token',
            };

            window.YaAuthSuggest.init(
                oauthQueryParams,
                'http://localhost:5002/authorization',
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

                    fetch('http://127.0.0.1:8000/auth/exchange_token/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData),
                    })
                        .then(response => response.json())
                        .then(responseData => {
                            console.log('Ответ от сервера:', responseData);

                            document.cookie = `access_token=${responseData.access}`;
                            document.cookie = `refresh_token=${responseData.refresh}`;
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

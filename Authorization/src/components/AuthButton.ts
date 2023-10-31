declare global {
    interface Window {
        YaAuthSuggest: {
            init: Function;
        };
    }
}

export function AuthButton() {
    const script = document.createElement('script');
    script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
    document.head.appendChild(script);

    script.onload = () => {
        const oauthQueryParams = {
            client_id: 'c46f0c53093440c39f12eff95a9f2f93',
            response_type: 'token',
            redirect_uri: 'https://examplesite.com/suggest/token',
        };

        window.YaAuthSuggest.init(
            oauthQueryParams,
            'https://examplesite.com',
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
            .then((data: any) => console.log('Сообщение с токеном', data))
            .catch((error: any) => console.log('Обработка ошибки', error));
    };
}

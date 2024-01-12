import { useEffect } from 'react';

declare global {
    interface Window {
        YaSendSuggestToken: (url: string, options: { flag: boolean }) => void;
    }
}
function TokenPage() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = function() {
            window.YaSendSuggestToken("https://lk.lamart.site/authorization", {
                flag: true,
            });
        };
    }, []);

    return (
        <html lang="ru">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, shrink-to-fit=no, viewport-fit=cover" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        </head>
        <body></body>
        </html>
    );
}

export default TokenPage;

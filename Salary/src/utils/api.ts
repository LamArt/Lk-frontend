import {
    ACCESS_LOCALSTORAGE_KEY,
    LOGIN_LOCALSTORAGE_KEY,
    PASSWORD_LOCALSTORAGE_KEY,
    REFRESH_LOCALSTORAGE_KEY,
    USER_LOCALSTORAGE_KEY
} from "../constans/localstorage.ts";

export const errorCatch = (error: { response : { data: { message: string }}, message: string }): string =>
    error.response && error.response.data
        ? typeof error.response.data.message === 'object'
            ? error.response.data.message[0]
            : error.response.data.message
        : error.message;

export const getContentType = () => ({
    'Content-Type': 'application/json',
});

export const removeAllStorage = () => {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    localStorage.removeItem(LOGIN_LOCALSTORAGE_KEY);
    localStorage.removeItem(PASSWORD_LOCALSTORAGE_KEY);
    localStorage.removeItem(REFRESH_LOCALSTORAGE_KEY);
    localStorage.removeItem(ACCESS_LOCALSTORAGE_KEY);
};

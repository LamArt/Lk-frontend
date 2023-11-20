import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';

interface SetAuthAction {
    type: 'SET_AUTH';
    payload: boolean;
}

interface LogoutAction {
    type: 'LOGOUT';
}

type AuthAction = SetAuthAction | LogoutAction;

const setAuth = () => {
    const navigate = useNavigate();

    return (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: 'SET_AUTH',
            payload: true,
        });

        navigate('/profile');
    };
};

const logout = () => {
    const navigate = useNavigate();

    return (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: 'LOGOUT',
        });

        navigate('/authorization');
    };
};

const authActions = { setAuth, logout };

export default authActions;

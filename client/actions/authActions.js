import * as types from './actionTypes';
import authService from '../services/authService';
import { browserHistory } from 'react-router';

export function loginSuccess() {
    return { type: types.LOG_IN_SUCCESS }
}

export function loginUser(credentials) {
    return function(dispatch) {
        return authService.login(credentials).then(response => {
            localStorage.setItem('jwt', response.token);
            browserHistory.push('/wish');
            dispatch(loginSuccess());
        }).catch(error => {
            throw(error);
        });
    };
}

export function logOutUser() {
    authService.logOut();
    browserHistory.push('/');
    return { type: types.LOG_OUT }
}
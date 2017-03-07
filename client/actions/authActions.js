import * as types from './actionTypes';
import authService from '../services/authService';
import { browserHistory } from 'react-router';

export function loginSuccess() {
    return { type: types.LOG_IN_SUCCESS }
}

export function loginAdminSuccess() {
    return { type: types.LOG_IN_ADMIN_SUCCESS }
}

export function loginFailed(errors){
    return { type: types.LOG_IN_FAILED, payload: errors }
}

export function loginUser(credentials) {
    return function(dispatch) {
        return authService.login(credentials).then(response => {
            localStorage.setItem('jwt', response.token);
            localStorage.setItem('role', response.user.role);
            browserHistory.push('/wish');
            dispatch(loginSuccess());
        }).catch(error => {
            throw(error);
        });
    };
}

export function loginAdmin(credentials) {
    return function(dispatch) {
        return authService.loginAdmin(credentials).then(response => {
            if(response.error){
                dispatch(loginFailed([{error: response.message}]));
            }
            else {
                localStorage.setItem('jwt', response.token);
                localStorage.setItem('role', response.user.role);
                browserHistory.push('/admin/panel');
                dispatch(loginSuccess());
            }
        }).catch(error => {
            dispatch(loginFailed([{error: error.message}]));
        });
    };
}

export function logOutUser() {
    authService.logOut();
    browserHistory.push('/');
    return { type: types.LOG_OUT }
}
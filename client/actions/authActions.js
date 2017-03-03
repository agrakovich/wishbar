import * as types from './actionTypes';
import authService from '../auth/authService';


export function loginSuccess() {
    return { type: types.LOG_IN_SUCCESS }
}

export function loginUser(credentials) {
    return function(dispatch) {
        return authService.login(credentials).then(response => {
            localStorage.setItem('jwt', response.jwt);
            dispatch(loginSuccess());
        }).catch(error => {
            throw(error);
        });
    };
}

export function logOutUser() {
    authService.logOut();
    return { type: types.LOG_OUT }
}
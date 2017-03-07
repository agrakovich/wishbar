import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case types.LOG_IN_SUCCESS:
            return { ...state, session: !!localStorage.jwt, authErrors: [] }
        case types.LOG_IN_ADMIN_SUCCESS:
            return { ...state, session: !!localStorage.jwt, authErrors: [] }
        case types.LOG_IN_FAILED:
            return { ...state, session: !!localStorage.jwt, authErrors: action.payload }
        case types.LOG_OUT:
            return { ...state, session: !!localStorage.jwt }
        default:
            return state;
    }
}
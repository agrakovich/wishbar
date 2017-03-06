import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case types.LOG_IN_SUCCESS:
            return { ...state, session: !!localStorage.jwt }
        case types.LOG_OUT:
            return { ...state, session: !!localStorage.jwt }
        default:
            return state;
    }
}
import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function wishReducer(state = initialState, action) {
    switch(action.type) {
        case types.WISH_TYPES_RECEIVED:
            return {
                ...state,
                wishTypes: action.payload
            };
        case types.WISH_CHECKED:
            return {
                ...state,
                checkedWishes: action.payload
            };
        case types.WISH_ORDER_FIELD_CHANGED:
            state[action.payload.fieldName] = action.payload.value
            return {
                ...state,
            }
        case types.WISH_ORDER_VALIDATION_FAILED:
            return {
                ...state,
                wishOrderErrors: action.payload
            }
        case types.WISH_ORDER_SUCCESS:
            return {
                ...state,
                wishOrderErrors: [],
                checkedWishes: [],
                wishTypes: [],
                note: []

            }

        default:
            return state;
    }
}
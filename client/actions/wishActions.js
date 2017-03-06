import * as types from './actionTypes';
import wishService from '../services/wishService';
import { browserHistory } from 'react-router';

export function wishTypesReceived(wishTypes) {
    return { type: types.WISH_TYPES_RECEIVED, payload: wishTypes }
}
export function wishOrderFieldChanged(fieldName, value){
    return { type: types.WISH_ORDER_FIELD_CHANGED, payload: {fieldName: fieldName, value: value} }
}
export function wishChecked(isChecked, id, checkedWishes){
    if (isChecked) {
        checkedWishes.push(id);
    } else {
        checkedWishes.splice(checkedWishes.indexOf(id), 1);
    }
    return { type: types.WISH_CHECKED, payload: checkedWishes }
}
export function wishOrderValidationFailed(errors){
    return { type: types.WISH_ORDER_VALIDATION_FAILED, payload: errors }
}
export function getWishTypes() {
    return function(dispatch) {
        return wishService.getWishTypes().then(response => {
            dispatch(wishTypesReceived(response.wishTypes));
        }).catch(error => {
            throw(error);
        });
    };
}

export function wishOrderSuccess() {
    return { type: types.WISH_ORDER_SUCCESS }
}
export function makeOrder(order) {
    return (dispatch) => {
        return wishService.makeOrder(order).then(response => {
            browserHistory.push('/');
            dispatch(wishOrderSuccess());
        }).catch(error => {
            throw(error);
        });
    };
}

import * as types from './actionTypes';
import wishService from '../services/wishService';
import { browserHistory } from 'react-router';
import groupArray from 'group-array';

export function wishTypesReceived(wishTypes) {
    return { type: types.WISH_TYPES_RECEIVED, payload: wishTypes }
}
export function wishCategoriesReceived(wishCategories) {
    return { type: types.WISH_CATEGORIES_RECEIVED, payload: wishCategories }
}
export function wishOrdersReceived(wishOrders) {
    return { type: types.WISH_ORDERS_RECEIVED, payload: wishOrders }
}

export function wishCategoryWasDeleted(newWishCategories){
    return { type: types.WISH_CATEGORY_WAS_DELETED, payload: newWishCategories }
}
export function wishTypeWasDeleted(newWishTypes){
    return { type: types.WISH_TYPE_WAS_DELETED, payload: newWishTypes }
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

export function wishOrderSuccess() {
    return { type: types.WISH_ORDER_SUCCESS }
}

export function getWishCategories() {
    return function(dispatch) {
        return wishService.getWishCategories().then(response => {
            dispatch(wishCategoriesReceived(response.wishCategories));
        }).catch(error => {
            throw(error);
        });
    };
}
export function addWishCategory(category) {
    return (dispatch) => {
        return wishService.addWishCategory(category).then(response => {
            browserHistory.push('/admin/wish/categories');
        }).catch(error => {
            throw(error);
        });
    };
}
export function removeWishCategory(id, wishCategories) {
    return (dispatch) => {
        return wishService.removeWishCategory(id).then(response => {
            const newWishCategories = wishCategories.filter(obj => obj._id != id);
            dispatch(wishCategoryWasDeleted(newWishCategories));
        }).catch(error => {
            throw(error);
        });
    };
}

export function removeWishType(id, wishTypes) {
    return (dispatch) => {
        return wishService.removeWishType(id).then(response => {
            const newWishTypes = wishTypes.filter(obj => obj._id != id);
            dispatch(wishTypeWasDeleted(newWishTypes));
        }).catch(error => {
            throw(error);
        });
    };
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
export function addWishType(wishType) {
    return (dispatch) => {
        return wishService.addWishType(wishType).then(response => {
            browserHistory.push('/admin/wish/types');
        }).catch(error => {
            throw(error);
        });
    };
}

export function getWishOrders() {
    return function(dispatch) {
        return wishService.getWishOrders().then(response => {
            dispatch(wishOrdersReceived(response.wishOrders));
        }).catch(error => {
            throw(error);
        });
    };
}
export function makeOrder(order) {
    return (dispatch) => {
        return wishService.makeOrder(order).then(response => {
            if(response.error){
                dispatch(wishOrderValidationFailed([{error: response.message}]));
            } else {
                browserHistory.push('/ordercreated');
                dispatch(wishOrderSuccess());
            }
        }).catch(error => {
            throw(error);
        });
    };
}
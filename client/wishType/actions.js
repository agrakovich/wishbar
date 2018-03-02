import wishService from '../services/wishService';
import * as actionTypes from './actionTypes';

export function wishTypesReceiveSuccess(wishTypes) {
  return { 
    type: actionTypes.WISH_TYPES_RECEIVE_SUCCESS,
    payload: wishTypes
  }
}

export function wishTypesReceiveFailure(error) {
  return { 
    type: actionTypes.WISH_TYPES_RECEIVE_FAILURE,
    error
  }
}

export function wishTypeCreateSuccess() {
  return { 
    type: actionTypes.WISH_TYPE_CREATE_SUCCESS
  }
}

export function wishTypeCreateFailure(error) {
  return { 
    type: actionTypes.WISH_TYPE_CREATE_FAILURE,
    error
  }
}

export function wishTypeUpdateSuccess(){
  return { 
    type: actionTypes.WISH_TYPE_UPDATE_SUCCESS 
  }
}

export function wishTypeUpdateFailure(error){
  return { 
    type: actionTypes.WISH_TYPE_UPDATE_FAILURE,
    error
  }
}

export function wishTypeRemoveSuccess(){
  return { 
    type: actionTypes.WISH_TYPE_REMOVE_SUCCESS
  }
}

export function wishTypeRemoveFailure(error){
  return { 
    type: actionTypes.WISH_TYPE_REMOVE_FAILURE,
    error
  }
}

export function removeWishType(id) {
  return (dispatch) => {
      return wishService.removeWishType(id).then(response => {
          dispatch(wishTypeRemoveSuccess());
      }).catch(error => {
          dispatch(wishTypeRemoveSuccess(error));
      });
  };
}

export function getWishTypes() {
  return function(dispatch) {
      return wishService.getWishTypes().then(response => {
          dispatch(wishTypesReceiveSuccess(response.wishTypes));
      }).catch(error => {
        dispatch(wishTypesReceiveFailure(error));
      });
  };
}
export function addWishType(wishType) {
  return (dispatch) => {
      return wishService.addWishType(wishType).then(response => {
          dispatch
      }).catch(error => {
          throw(error);
      });
  };
}
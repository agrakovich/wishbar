import * as actionTypes from './actionTypes';

export const initialState = {
  wishTypes: [],
  error: false,
  errorText: '',
  newWishType: {
    name: '',
    description: '',
    category: ''
  },
  editableWishType: {
    id: null,
    name: '',
    description: '',
    category: ''
  },

};

export default function wishReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.WISH_TYPES_RECEIVE_SUCCESS:
          return {
              ...state,
              wishTypes: action.payload
          };
        

        default:
            return state;
    }
}
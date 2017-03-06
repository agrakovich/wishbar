import { combineReducers } from 'redux';
import authReducer from './authReducer';
import wishReducer from './wishReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    wish: wishReducer,
    form: formReducer
})

export default rootReducer;
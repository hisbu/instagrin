import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    NOT_LOGIN_YET,
    LOGOUT_USER
} from '../actions/type'

const INITIAL_STATE = {
    user : null,
    loading: false,
    checkedAuth: false
}

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case LOGIN_USER_SUCCESS:
            return {...INITIAL_STATE, user: action.payload, checkedAuth: true}
        case LOGOUT_USER:
            return {...INITIAL_STATE, checkedAuth: true}
        case NOT_LOGIN_YET:
            return {...INITIAL_STATE, checkedAuth: true}
        default:
            return state;
    }
};
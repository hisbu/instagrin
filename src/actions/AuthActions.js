import firebase from '@firebase/app'
import '@firebase/auth'

import {
    LOGOUT_USER, LOGIN_USER_SUCCESS, NOT_LOGIN_YET
} from './type'

export const logoutUser = () => {
    return (dispatch) =>{
        firebase.auth().signOut()
        .then(res =>{
            dispatch({ type: LOGOUT_USER })
        })
    }
}

export const alreadyLogin = (user) =>{
    return{
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
}

export const notLoginYet = () =>{
    return {
        type: NOT_LOGIN_YET
    }
}
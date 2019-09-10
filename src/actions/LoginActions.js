import firebase from '@firebase/app'
import '@firebase/auth'

import{
    EMAIL_LOGIN_CHANGED,
    PASSWORD_LOGIN_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS
} from './type'

// import { dispatch } from 'C:/Users/hisbu/AppData/Local/Microsoft/TypeScript/3.5/node_modules/rxjs/internal/observable/pairs';


export const emailLoginChanged = (text) => {
    return{
        type    : EMAIL_LOGIN_CHANGED,
        payload : text
    };
};

export const passwordLoginChanged = (text) => {
    return{
        type    : PASSWORD_LOGIN_CHANGED,
        payload : text
    };
};


export const loginUser = (email, password )=>{
    return (dispatch) =>{
        dispatch({ type: LOGIN_USER}); // membuat button login menjadi spiner

        if(email !== '' && password !== ''){ //cek textbox tidak boleh kosong
                firebase.auth().signInWithEmailAndPassword(email, password) // create user kedalam firebase 
                .then((user)=>{ //mereturn promise
                    console.log('Login success')
                    console.log(user)
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        payload: user //kirim payload user ke login recucers // 
                    });
                })
                .catch((err)=>{
                    console.log(err)
                    dispatch({type: LOGIN_USER_FAIL, payload: err.message}) //jika gagal create user difirebase kirim error message ke reducer
                })
        }else{
            dispatch({type: LOGIN_USER_FAIL, payload: 'All Form Must be Filled!'}) //jika ada textbox ada yang kosong, kirim error message ke reducer
        }
    }
}
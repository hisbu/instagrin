import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

import{
    EMAIL_REGISTER_CHANGED,
    USERNAME_REGISTER_CHANGED,
    PASSWORD_REGISTER_CHANGED,
    CON_PASSWORD_REGISTER_CHANGED,
    REGISTER_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS
} from './type'

// import { dispatch } from 'C:/Users/hisbu/AppData/Local/Microsoft/TypeScript/3.5/node_modules/rxjs/internal/observable/pairs';


export const emailRegisterChanged = (text) => {
    return{
        type    : EMAIL_REGISTER_CHANGED,
        payload : text
    };
};

export const usernameRegisterChanged = (text) => {
    return{
        type    : USERNAME_REGISTER_CHANGED,
        payload : text
    };
};

export const passwordRegisterChanged = (text) => {
    return{
        type    : PASSWORD_REGISTER_CHANGED,
        payload : text
    };
};

export const conPasswordRegisterChanged = (text) => {
    return{
        type    : CON_PASSWORD_REGISTER_CHANGED,
        payload : text
    };
};

export const registerUser = (email, username, password, conPassword)=>{
    return (dispatch) =>{
        dispatch({ type: REGISTER_USER}); // membuat button register menjadi spiner

        if(email !== '' && username !== '' && password !== '' && conPassword !== ''){ //cek textbox tidak boleh kosong
            if(password === conPassword){   // cek apakah password sudah sama dengan conpassword
                firebase.auth().createUserWithEmailAndPassword(email, password) // create user kedalam firebase 
                .then((user)=>{ //mereturn promise
                    console.log('Register success')
                    console.log(user)
                    user.user.updateProfile({
                        displayName: username,
                        photoURL: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png'
                    }).then(()=>{ //return promise setelah create user di firebase berhasil
                        //push data uid dan user ke firebase realtime database
                        firebase.database().ref(`/users/${user.user.uid}`) //menentukan path collection database di firebase
                        .push({
                            displayName: username,
                            photoURL: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png'
                        }).then(() => {
                            dispatch({
                                type: REGISTER_USER_SUCCESS 
                            })
                            dispatch({
                                type: LOGIN_USER_SUCCESS,
                                payload: user //kirim payload user ke auth recucers // 
                            });
                        }).catch((err) =>{
                            dispatch({ type: REGISTER_USER_FAIL, payload: err.message})
                        })

                        console.log('Update profile success')
                        console.log(user)
                    }).catch((err)=>{
                        console.log(err)
                        dispatch({type: REGISTER_USER_FAIL, payload: err.message });
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    dispatch({type: REGISTER_USER_FAIL, payload: err.message}) //jika gagal create user difirebase kirim error message ke reducer
                })
            }else{
                dispatch({type: REGISTER_USER_FAIL, payload: 'Confirm passowrd Different'}) //jika password dan con password beda kirim error message ke reducer
            }
        }else{
            dispatch({type: REGISTER_USER_FAIL, payload: 'All Form Must be Filled!'}) //jika ada textbox ada yang kosong, kirim error message ke reducer
        }
    }
}
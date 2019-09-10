import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
import RNFetchBlob from 'react-native-fetch-blob'

import {
    EDIT_POST,
    EDIT_POST_FAIL,
    EDIT_POST_SUCCESS,
    EDIT_POST_INIT,
    CAPTION_CHANGED
} from '../actions/type'

export const editPostInit = ( username, photoUrl, userId, postImg, caption, postId ) =>{
    return {
        type: EDIT_POST_INIT,
        payload : {
            usename,
            photoUrl,
            userId,
            postImg,
            caption,
            postId
        }
    }
}

export const captionEditChange = (text)=>{
    return{
        type: CAPTION_CHANGED,
        payload: text
    }
}

export const saveUpdatePost = (caption)=>{
    return (dispatch) => {
        dispatch({
            type: EDIT_PROFILE
        })
        const { currentUser } = firebase.auth()

        if(profileImage){
            const image = profileImage
         
            const Blob = RNFetchBlob.polyfill.Blob
            const fs = RNFetchBlob.fs
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
            window.Blob = Blob
         
           
            let uploadBlob = null

            var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)) //ranLatter => generate string random untuk nama file yang akan di upload ke firebase (huruf awal saja)
            var uniqid = randLetter + Date.now() + '.jpg'

            const imageRef = firebase.storage().ref('users').child(uniqid)
            let mime = 'image/jpg'
            fs.readFile(image, 'base64')
              .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` }) //menyiapkan file yang akan diupload
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime }) // upload image ke storage firebase
              })
              .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL() 
              })
              .then((url) => {
                // URL of the image uploaded on Firebase storage

                console.log(url);

                currentUser.updateProfile({
                    displayName: username,
                    photoURL: url
                }).then(()=>{
                    return firebase.database().ref(`/users/${currentUser.uid}`)
                        .once('value', snapshot => {
                            var id = Object.keys(snapshot.val())[0]
                            return firebase.database().ref(`/users/${currentUser.uid}/${id}`)
                                .set({
                                    displayName : username,
                                    photoURL: url
                                })
                        })  
                  })
                
              })
              
              .then(()=>{
                dispatch({
                    type: EDIT_PROFILE_SUCCESS
                })
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: {user : currentUser}
                })
              })
              .catch((error) => {
                console.log(error);
                dispatch({
                    type: EDIT_PROFILE_FAIL,
                    payload : error.message
                })
              })  
        }else{
            
            currentUser.updateProfile({
                displayName: username
            }).then(()=>{
                return firebase.database().ref(`/users/${currentUser.uid}`)
                    .once('value', snapshot => {
                        var id = Object.keys(snapshot.val())[0]
                        return firebase.database().ref(`/users/${currentUser.uid}/${id}`)
                            .set({
                                displayName : username,
                                photoURL: currentUser.photoURL
                            })
                    })  
            }).then(()=>{
            dispatch({
                type: EDIT_PROFILE_SUCCESS
            })
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {user : currentUser}
            })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: EDIT_PROFILE_FAIL,
                    payload : error.message
                })
            }) 
        }
    }
}
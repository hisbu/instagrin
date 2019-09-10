import React, {Component} from 'react'
import {View} from 'react-native'
import firebase from '@firebase/app'
import '@firebase/auth'
import Main from './Main'
import { connect } from 'react-redux'
import { alreadyLogin, notLoginYet } from '../actions'

class AppInit extends Component{

    componentDidMount(){
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyCs0OJfrSv4ujmelsYIkDjXBLsYmWpyckg",
            authDomain: "instagrin4.firebaseapp.com",
            databaseURL: "https://instagrin4.firebaseio.com",
            projectId: "instagrin4",
            storageBucket: "instagrin4.appspot.com",
            messagingSenderId: "973105585170",
            appId: "1:973105585170:web:c5dfd4d0faa813ea"
        };
        // Initialize Firebase
        if(!firebase.apps.length){ //jika data pada firebase di local belum tersedia, makan firebsase inisialisasi dijalankan
          firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged((user) => {
          if(user){
            this.props.alreadyLogin({user})
          }else{
            this.props.notLoginYet();
          }
        })
    }

  render(){
    return(
      <View style={{flex:1}}>
        <Main/>
      </View>

    )
  }
}

export default connect(null, {alreadyLogin, notLoginYet}) (AppInit);
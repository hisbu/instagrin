import React, {Component} from 'react'
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import _ from 'lodash'
import { View, Text, Platform, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Header, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { editProfileInit, postDetailInit } from '../actions'
class Profile extends Component{
    state={
        postList: []
    }

    componentDidMount(){
        firebase.database().ref(`/posts/`) //akses post dalam database
        .on('value', snapshot => { //akses data menggunakan 'value agar setiap ada perubahan di database firebase akan request data dari database'
            // console.log(snapshot.val())
            var postList = []
            _.map(snapshot.val(), (val, id)=>{ //maping objek menggunakan lodash
                if(val.userId === this.props.user.user.uid){
                    postList.push({
                        ...val,
                        id
                    })
                }
                this.setState({postList})
                console.log('=========> ')
            })
        })
        
    }
    renderPostList = () => {
        return this.state.postList.map((item)=>{
            return(
                <View>
                    <TouchableWithoutFeedback onPress={()=> this.onPostImagePress(item.id, item.imgUrl)} >
                    <Image source={{uri: item.imgUrl }} style={{ width: 125, height: 125, marginBottom: 10}}/>

                    </TouchableWithoutFeedback>
                </View>
            )
        })
    }

    componentDidUpdate(){
        console.log(this.state.postList)
    }


    onBtnEditProfilePress = () => {
        this.props.editProfileInit(
            this.props.user.user.displayName,
            this.props.user.user.photoURL 
            )
        this.props.navigation.navigate('EditProfile')
    }

    onPostImagePress = (id, img) =>{
        this.props.postDetailInit(
            this.props.user.user.displayName,
            this.props.user.user.photoURL,
            img,
            this.props.user.user.uid,
            id
        )
        this.props.navigation.navigate('PostDetail')
    }

    render(){
        
        if(this.props.user && this.state.postList){
            return(
                <View>
                    <Header
                        leftComponent={{ 
                            text: this.props.user.user.displayName,
                            style:{ color: 'black', fontSize: 18}
                        }}
                        leftContainerStyle={{ flex: 3}}
                        rightComponent={{ 
                            icon: 'menu', 
                            color: 'black',
                            onPress: ()=> this.props.navigation.toggleDrawer() }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0 : -25
                        }}
                        
                    />
                    <ScrollView>
                    <ListItem
                        leftAvatar={{
                            source: { uri : this.props.user.user.photoURL},
                            showEditButton: false,
                            size: 'large'
                        }}
                        title={this.props.user.user.displayName}
                        subtitle={'Instagrin User'}
                    />

                    <Button
                        title="Edit Profile"
                        containerStyle={{ marginTop: 15, marginHorizontal: 15}}
                        buttonStyle={{borderColor: 'black'}}
                        titleStyle={{color: 'black'}}
                        type='outline'
                        onPress={this.onBtnEditProfilePress}
                    />
                    {/* <Text>{this.state.postList}</Text> */}
                    <View style={{flex: 1, justifyContent: 'space-between', flexWrap:'wrap', flexDirection:'row', marginTop: 20}}>
                        {this.renderPostList()}
                    </View>

                    </ScrollView>
    

                </View>
            )
        }
        return <View/>
    }
}

const mapStateToProps = ({auth})=>{
    return {
        user    : auth.user
    }
}

export default connect(mapStateToProps, {editProfileInit, postDetailInit}) (Profile);
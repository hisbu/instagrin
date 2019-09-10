import React, {Component} from 'react'
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { Header, ListItem, Button, Input, Image, Overlay, Icon} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux'
import { usernameEditProfileChange, modalShowing, modalClosing, imageEditProfileChange, saveUpdateProfile } from '../actions'
class EditProfile extends Component{

    openGallery = () => {
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
        }).then(img => {
              this.props.imageEditProfileChange(img.path)
              this.props.modalClosing()
        }).catch(cancel => {
            console.log(cancel)
        })
    }

    openCamera = () =>{
        ImagePicker.openCamera({
            width: 700,
            height: 700,
            cropping: true,
        }).then(img => {
            this.props.imageEditProfileChange(img.path)
            this.props.modalClosing()
        }).catch(cancel => {
            console.log(cancel)
        })
    }

    onIconSavePress = () =>{
        if(this.props.oldPhoto !== this.props.profileImage){
            this.props.saveUpdateProfile(
                this.props.username,
                this.props.profileImage
            )
        }else{
            this.props.saveUpdateProfile(
                this.props.username,
                null
            )
        }
    }

    componentDidUpdate(){
        if(this.props.profileUpdated){
            this.props.navigation.goBack()
        }
    }

    render () {
        return (
            <View>
                 <Header
                    placement='left'
                    centerComponent={{
                        text: 'Edit Profile',
                        style: { color: 'black', fontSize: 18}
                    }}
                    leftComponent={{ 
                        icon: 'clear',
                        color: 'black',
                        onPress: ()=> this.props.navigation.goBack()
                    }}
                    rightComponent={{
                        icon: 'done',
                        color: '#4388d6',
                        onPress: this.onIconSavePress
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -25
                    }}
                    
                />
                <View style={{ alignItems:'center'}}>
                    <Image source={{uri: this.props.profileImage }} style={{ width: 80, height: 80, borderRadius: 80}}/>
                    <TouchableWithoutFeedback onPress={ () => this.props.modalShowing()}>
                        <Text style={{color: '#4388d6', fontSize: 17, paddingTop: 10}}>
                            Change Profile Photo
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{paddingTop: 15}}>
                    <Text style={{paddingLeft: 10}}>User name</Text>
                    <Input
                            placeholder='Username'
                            value = {this.props.username}
                            onChangeText={(text)=> this.props.usernameEditProfileChange(text)}
                    />
                </View>

                <Overlay
                    isVisible={this.props.modalShow}
                    onBackdropPress = {() => this.props.modalClosing()}
                    height= {'auto'}
                >
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '800',
                        paddingBottom: 10,
                        borderBottomColor: '#CFCFCF',
                        borderBottomWidth: 1
                    }}>
                        Change Profile Photo
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={this.openGallery}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                paddingVertical: 15
                            }}
                        >
                            Select from Gallery
                        </Text>

                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={this.openCamera}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                paddingVertical: 15
                            }}
                        >
                            Open Camera
                        </Text>
                    </TouchableWithoutFeedback>
                </Overlay>
            </View>
        )
    }
}

const mapStateToProps = ({editProfile, auth})=>{
    return{
        username        : editProfile.username,
        profileImage    : editProfile.profileImage,
        error           : editProfile.error,
        loading         : editProfile.loading,
        modalShow       : editProfile.modalShow,
        profileUpdated  : editProfile.profileUpdated,
        oldPhoto        : auth.user.user.photoURL
        
    }
}

export default connect(mapStateToProps, {
    usernameEditProfileChange, 
    modalShowing, 
    modalClosing, 
    imageEditProfileChange, 
    saveUpdateProfile
}) (EditProfile);
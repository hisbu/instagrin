import React, {Component} from 'react'
import {View, Text, Platform, Image, TouchableWithoutFeedback} from 'react-native'
import { Header, Button, Overlay} from 'react-native-elements'
import { Card, CardItem, Thumbnail, Icon, Left, Body, Right} from 'native-base'
import { connect } from 'react-redux'
import { detailModalShowing, detailModalClosing} from '../actions'


class PostDetail extends Component{

    
    render(){
        return(
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Header
                    placement='left'
                    centerComponent={{
                        text: 'Posts',
                        style: { color: 'black', fontSize: 18}
                    }}
                    leftComponent={{ 
                        icon: 'arrow-back',
                        color: 'black',
                        onPress: ()=> this.props.navigation.goBack()
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -25
                    }}
                    
                />

                <View style={{width:'100%'}}>
                    <Card>
                        <CardItem>
                        <Left>
                            <Thumbnail source={{uri: this.props.photoUrl}} />
                            <Body>
                            <Text>{this.props.username}</Text>
                            <Text note>Instagrin User</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Icon
                                name='more'
                                color='#000'
                                style={{fontSize: 30}}
                                // onPress= {()=> this.props.detailModalShowing()}
                                />
                        </Right>
                        </CardItem>
                        <CardItem cardBody>
                        <Image source={{ uri: this.props.image}} style={{flex: 1, height: 350}}/>
                        </CardItem>
                        <CardItem>
                        <Body>
                            <Left>
                                <Button transparent>
                                <Icon active name="chatbubbles" />
                                {/* <Text>{val.caption}</Text> */}
                                </Button>
                            </Left>
                        </Body>
                        <Right>
                            <Text>11h ago</Text>
                        </Right>
                        </CardItem>
                    </Card>
                </View>

                <Overlay
                    isVisible='false'
                    onBackdropPress = {() => this.props.detailModalClosing()}
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

const mapStateToProps = ({postDetail})=>{
    return{
        username  : postDetail.username,
        photoUrl : postDetail.photoUrl,
        postId : postDetail.postId,
        image : postDetail.image,
        userId : postDetail.userId,
        detailModalShow: postDetail.detailModalShow
    }
}

export default connect(mapStateToProps, {detailModalShowing, detailModalClosing}) (PostDetail);
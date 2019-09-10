import React, {Component} from 'react'
import {View, Text, Platform, Image, TouchableWithoutFeedback} from 'react-native'
import { Header, Overlay} from 'react-native-elements'
import { Card, CardItem, Button, Thumbnail, Icon, Left, Body, Right} from 'native-base'
import { connect } from 'react-redux'
import { detailModalShowing, detailModalClosing} from '../actions'


class EditPost extends Component{
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
                                <Button transparent>
                                    <Icon
                                        name='more'
                                        color='#000'
                                        style={{fontSize: 30}}
                                        onPress={()=> this.props.detailModalShowing()}
                                    />
                                    
                                        {/* onPress= {()=> this.props.detailModalShowing()} */}
                                </Button>
                                
                            </Right>
                            </CardItem>
                            <CardItem cardBody>
                            <Image source={{ uri: this.props.image}} style={{flex: 1, height: 350}}/>
                            </CardItem>
                            <CardItem style={{height:40}}>
                                <Left>
                                    <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>  {this.props.caption}</Text>
                                    </Button>
                                </Left>
    
                            </CardItem>
                        </Card>
                    </View>
    
                    {/* <Overlay
                        isVisible={this.props.detailModalShow}
                        onBackdropPress = {() => this.props.detailModalClosing()}
                        height= {'auto'}
                    >
                        <TouchableWithoutFeedback
                            // onPress={}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    paddingVertical: 15
                                }}
                            >
                                Edit
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
                                Delete
                            </Text>
                        </TouchableWithoutFeedback>
                    </Overlay>            */}
                    
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
        caption: postDetail.caption,
        detailModalShow: postDetail.detailModalShow
    }
}

export default connect(mapStateToProps, {detailModalShowing, detailModalClosing}) (EditPost);
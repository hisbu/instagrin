import React, {Component} from 'react'
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
import RNFetchBlob from 'react-native-fetch-blob'
import {View, Text, Platform, Image} from 'react-native'
import { Header} from 'react-native-elements'
import { Card, CardItem, Thumbnail, Icon, Left, Body, Right, Button, Spinner} from 'native-base'
import { connect } from 'react-redux'
import { detailModalShowing, detailModalClosing} from '../actions'


class PostDetail extends Component{
    state={
        loading: false
    }
    onEditPress = () => {
        this.props.navigation.navigate('EditPost')
        this.props.detailModalClosing()
    }

    onBtndeletePress = () =>{
        this.setState({loading: true})
        console.log('====masuk btn delete=====')
        firebase.database().ref(`/posts/${this.props.postId}`)
            .remove()
            .then(()=>{
                console.log('================ disini ===========')
                console.log(this.props.postId)
                console.log('delete-success')
                this.setState({loading: false})
                this.props.navigation.goBack()
            })
    }
    render(){
        if(this.props.user.user === null){
            return <View/>
        }
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
                                <Right>
                                    {this.state.loading ?
                                    <Spinner color='blue' /> 
                                    :
                                    <Button transparent onPress={this.onBtndeletePress}>     
                                        <Icon name="trash"/>
                                        <Text> Delete Post</Text>
                                    </Button>
                                }
                                </Right>
    
                            </CardItem>
                        </Card>
                    </View>       
                    
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

export default connect(mapStateToProps, {detailModalShowing, detailModalClosing}) (PostDetail);
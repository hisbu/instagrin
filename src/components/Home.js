import React, {Component} from 'react'
import { View, Platform, ScrollView, Image} from 'react-native'
import { Header } from 'react-native-elements'
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import _ from 'lodash'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right} from 'native-base'


class Home extends Component{
    state={
        postList: []
    }

    componentDidMount(){
        firebase.database().ref('/posts') //akses post dalam database
        .on('value', snapshot => { //akses data menggunakan 'value agar setiap ada perubahan di database firebase akan request data dari database'
            // console.log(snapshot.val())
            var postList = []
            _.map(snapshot.val(), (val, id)=>{ //maping objek menggunakan lodash
                firebase.database().ref(`/users/${val.userId}`) //akses data dari database user
                .once('child_added', (snapshot)=>{
                    var value = snapshot.val()
                    // console.log(value)
                    postList.push({
                        ...val,
                        id, 
                        userName    : value.displayName,
                        userPhoto   : value.photoURL
                    })
                    this.setState({postList})
                    // console.log(this.state.postList)
                })
            })
        })
        
    }

    renderPostList = () => { 
        // console.log(this.state.postList)
        var data = this.state.postList
        return data.map((val, i)=>{
            return(
                <View style={{ marginHorizontal: 5}}>
                    <Card>
                        <CardItem>
                        <Left>
                            <Thumbnail source={{uri: val.userPhoto}} />
                            <Body>
                            <Text>{val.userName}</Text>
                            <Text note>Instagrin User</Text>
                            </Body>
                        </Left>
                        </CardItem>
                        <CardItem cardBody>
                        <Image source={{uri: val.imgUrl}} style={{height: 350, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                        <Body>
                            <Left>
                                <Button transparent>
                                <Icon active name="chatbubbles" />
                                <Text>{val.caption}</Text>
                                </Button>
                            </Left>
                        </Body>
                        <Right>
                            <Text>11h ago</Text>
                        </Right>
                        </CardItem>
                    </Card>
                </View>
            )
        })
    }

    render(){
        // console.log(this.state.postList)
        return(
            <View style={{ flex: 1 }}>
                <Header
                        centerComponent={{ 
                            text: 'Instagrin',
                            style:{ color: 'black', fontSize: 24}
                        }}
                        // leftContainerStyle={{ flex: 3}}
                        // rightComponent={{ icon: 'menu', color: 'black' }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0 : -25
                        }}
                    />
                <ScrollView >
                    {this.renderPostList()}
                </ScrollView>
            </View>
        )
    }
}

export default Home;
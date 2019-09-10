import React, {Component} from 'react'
import {View, Text, Platform} from 'react-native'
import { Header, ListItem, Button} from 'react-native-elements'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'

class Settings extends Component{
    componentDidUpdate(){
        if(!this.props.user){
            this.props.screenProps.rootStackNavigator.navigate('Login')
        }
    }
    onBtnLogoutPress=() =>{
        this.props.logoutUser();
    }
    render(){
      
        return(
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Header
                    placement='left'
                    centerComponent={{
                        text: 'Setting',
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
                <Button
                    icon={{name: 'logout',
                    type: 'antdesign',
                    size: 25,
                    color: "4388d6"    
                }}
                title="Logout"
                containerStyle={{ marginTop: 30, marginHorizontal: 15}}
                type='outline'
                onPress={this.onBtnLogoutPress}
                />
                
            </View>
        )
    }
}

const mapStateToProps = ({auth}) =>{
    return { user: auth.user ? auth.user : null}
}

export default connect(mapStateToProps, { logoutUser }) (Settings);
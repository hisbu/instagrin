import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable';
import {
    emailLoginChanged,
    passwordLoginChanged,
    loginUser
} from '../actions'


class LoginForm extends Component{
    state={
        passHidden: true
    }

    componentDidUpdate(){ //akan jalan ketika ada perubahan di global state dan di props dalam component ini
        if(this.props.user){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainMenu'})],
            });
            this.props.navigation.dispatch(resetAction)
        }
        console.log('=====di login page ======', this.props.user)
        // if(this.props.user){
            // this.props.navigation.navigate('MainMenu') //navigation berupa props dari navigation stack di component Main
        // }
    }

    onBtnLoginPress = () =>{
        console.log
        this.props.loginUser(
            this.props.email,
            this.props.password
        )
    }

    renderError(){
        if(this.props.error){
            return(
                <Animatable.View animation={'shake'}>
                    <View style={{marginBottom: 15}}>
                        <Text style={{ color: 'red'}}>
                            {this.props.error}
                        </Text>
                    </View>
                </Animatable.View>
            );
        }
    }

    render(){
        const { containerStyle, inputStyle, buttonStyle } = styles;
       
        if(this.props.checkedAuth && !this.props.user){
            return(
                <View style={containerStyle}>
                    <Animatable.Text animation={'fadeInDown'}>
                        <Text h3 style={{color:'#4388d6'}}>Instagrin</Text>
                    </Animatable.Text>
                    <Animatable.View animation={'slideInUp'}  style={inputStyle}>
                        <Input
                            containerStyle={{marginBottom:10}}
                            placeholder='Email'
                            leftIcon={
                                <Icon
                                    name='email'
                                    size={24}
                                    color='#4388d6'
                                />
                            }
                            value={this.props.email}
                            onChangeText={(text)=> this.props.emailLoginChanged(text)}
                        />
                        <Input
                            containerStyle={{marginBottom:10}}
                            secureTextEntry={this.state.passHidden}
                            placeholder='Password'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={24}
                                    color='#4388d6'
                                />
                            }
                            rightIcon={
                                <Icon
                                    name= {this.state.passHidden? 'visibility-off' : 'visibility'}
                                    size={24}
                                    color={this.state.passHidden ? '#4388d6' : 'red'}
                                    onPress={()=>this.setState({passHidden:!this.state.passHidden})}
                                    />
                            }
                            value={this.props.password}
                            onChangeText={(text)=> this.props.passwordLoginChanged(text)}
                        />
                    </Animatable.View>
                    
                    
                        {this.renderError()}
                    
                    <Animatable.View animation={'zoomInLeft' } duration={3000}   style={{width: '90%'}}>
                        <Button
                            icon={
                                <Icon
                                name="vpn-key"
                                size={20}
                                color="white"
                                />
                            }
                            title="  Login"
                            type="solid"
                            raised
                            loading = {this.props.loading}
                            onPress = {this.onBtnLoginPress}
                            containerStyle={{width: '100%', marginBottom:10}}
                        />
                    </Animatable.View>
                    
                    <Animatable.View animation={'zoomInRight' } duration={3000}  style={{width: '90%'}}>
                        <Button
                            icon={
                                <Icon
                                name="accessibility"
                                size={20}
                                color="#4388d6"
                                />
                            }
                            title="  Register"
                            type="outline"
                            
                            onPress={()=>this.props.navigation.navigate('Register')}
                            containerStyle={{width:'100%'}}
                        />
                    </Animatable.View>
                </View>
            )
        }
        return (
            <View style={containerStyle}>
                <Animatable.Text animation={'bounce'} iterationCount={'infinite'}>
                    <Text h3 h3Style={{color: '#4388d6'}}>Authenticating...</Text>
                </Animatable.Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex:1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle:{
        width: '95%',
        marginTop: 30,
        marginBottom: 50
    },
    buttonStyle:{
        width: '100%',
        marginBottom: 10
    }
})

const mapsStateToProps =( { loginForm, auth})=>{
    return {
        email       : loginForm.email,
        password    : loginForm.password,
        loading     : loginForm.loading,
        error       : loginForm.error,
        user        : auth.user,
        checkedAuth : auth.checkedAuth
    }
}

export default connect(mapsStateToProps, {
                                            emailLoginChanged,
                                            passwordLoginChanged,
                                            loginUser
                                        }) (LoginForm);
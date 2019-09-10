import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import {
    emailRegisterChanged,
    usernameRegisterChanged,
    passwordRegisterChanged,
    conPasswordRegisterChanged,
    registerUser
} from '../actions'

class RegisterForm extends Component{
    state={
        passHidden: true,
        conPassHidden: true
    }

    componentDidUpdate(){ //akan jalan ketika ada perubahan di global state dan di props dalam component ini
        if(this.props.user){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainMenu'})],
            });
            this.props.navigation.dispatch(resetAction)
        }

        // if(this.props.user){
            // this.props.navigation.navigate('MainMenu') //navigation berupa props dari navigation stack di component Main
        // }
    }

    onBtnRegisterPress=()=>{
        this.props.registerUser(
            this.props.email,
            this.props.username,
            this.props.password,
            this.props.conPassword
        )
    }

    renderError(){
        if(this.props.error){
            return(
                <View style={{marginBottom: 15}}>
                    <Text style={{ color: 'red'}}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    render(){
        const { containerStyle, inputStyle, buttonStyle, inputTextStyle } = styles;
        return(
            <View style={containerStyle}>
                <Text h3 style={{color:'#4388d6'}}>Welcome !</Text>
                <View style={inputStyle}>
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
                        value = {this.props.email}
                        onChangeText={(text)=> this.props.emailRegisterChanged(text)}
                    />
                    <Input
                        containerStyle={{marginBottom:10}}
                        placeholder='Username'
                        leftIcon={
                            <Icon
                                name='account-box'
                                size={24}
                                color='#4388d6'
                            />
                        }
                        value = {this.props.username}
                        onChangeText={(text)=> this.props.usernameRegisterChanged(text)}
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
                        value = {this.props.password}
                        onChangeText={(text)=> this.props.passwordRegisterChanged(text)}
                    />
                    <Input
                        
                        secureTextEntry={this.state.conPassHidden}
                        placeholder='Confirm Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='#4388d6'
                            />
                        }
                        rightIcon={
                            <Icon
                                name= {this.state.conPassHidden? 'visibility-off' : 'visibility'}
                                size={24}
                                color={this.state.conPassHidden ? '#4388d6' : 'red'}
                                onPress={()=>this.setState({conPassHidden:!this.state.conPassHidden})}
                                />
                        }
                        value = {this.props.conPassword}
                        onChangeText={(text)=> this.props.conPasswordRegisterChanged(text)}
                    />
                </View>
                {this.renderError()}
                <Button
                    icon={
                        <Icon
                        name="accessibility"
                        size={20}
                        color="white"
                        />
                    }
                    title="Register"
                    type="solid"
                    loading={this.props.loading}
                    onPress={this.onBtnRegisterPress}
                    containerStyle={{width:'90%'}}
                />
            </View>
        )
    }
}

//============ styling ============
const styles = StyleSheet.create({
    containerStyle: {
        flex:1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle:{
        width: '100%',
        marginTop: 30,
        marginBottom: 50
    },
    inputTextStyle:{
        marginBottom: 35
    },
    buttonStyle:{
        width: '100%',
        marginBottom: 10
    }
})

//============ redux ============
const mapStateToProps=({registerForm, auth})=>{
    return{
        email       : registerForm.email,
        username    : registerForm.username,
        password    : registerForm.password,
        conPassword : registerForm.conPassword,
        loading     : registerForm.loading,
        error       : registerForm.error,
        user        : auth.user
    }
}

export default connect(mapStateToProps, {
                                            emailRegisterChanged,
                                            usernameRegisterChanged,
                                            passwordRegisterChanged,
                                            conPasswordRegisterChanged,
                                            registerUser
                                        }) (RegisterForm);
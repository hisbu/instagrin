import React from 'react'
import { createDrawerNavigator, createAppContainer} from 'react-navigation'
import {Icon} from 'react-native-elements'
import Profile from './Profile'
import Settings from './Settings'
import EditProfile from './EditProfile'
import PostDetail from './PostDetail'
import EditPost from './EditPost'

const DrawerNavigator = createAppContainer(createDrawerNavigator(
    {
        profile: {
            screen: Profile,
            navigationOptions:{
                drawerLabel: () => null
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions:{
                drawerLabel: 'Settings',
                drawerIcon: ({ tintColor }) => (
                    <Icon name={'cog'} type='font-awesome' size={25} color={tintColor}/>
                )
            }
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions:{
                drawerLabel: () => null
            }
        },
        PostDetail: {
            screen: PostDetail,
            navigationOptions:{
                drawerLabel: () => null
            }
        }
    },
    {
        drawerBackgroundColor: '#FFF',
        drawerPosition: 'right',
        drawerType: 'slide',
        overlayColor: 0,
        style:{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            elevation: 5
        }
    }
    
))

export default DrawerNavigator;
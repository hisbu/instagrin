import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import RegisterReducer from './RegisterReducer'
import LoginReducer from './LoginReducer'
import EditProfileReducer from './EditProfileReducer'
import PostDetailReducer from './DetailPostReducers'

export default combineReducers({
    auth            : AuthReducer,
    registerForm    : RegisterReducer,
    loginForm       : LoginReducer,
    editProfile     : EditProfileReducer,
    postDetail      : PostDetailReducer
});
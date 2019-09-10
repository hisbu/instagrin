import {
    EDIT_POST,
    EDIT_POST_FAIL,
    EDIT_POST_SUCCESS,
    EDIT_POST_INIT,
    CAPTION_CHANGED
} from '../actions/type'

const INITIAL_STATE = {
    username : '',
    photoUrl: '',
    image : '',
    userId : '',
    postId : '',
    caption:'',
    postUpdated: false,
    loading: false,
    error: ''
}

export default(state = INITIAL_STATE, action) =>{
    switch(action.type){
        case EDIT_POST_INIT:
            return { ...INITIAL_STATE, ...action.payload}
        case CAPTION_CHANGED:
            return {...state, caption: action.payload}
        case EDIT_POST:
            return {...state, loading: true, error:''}
        case EDIT_POST_FAIL:
                return { ...state, error: action.payload, loading: false}
        case EDIT_POST_SUCCESS:
            return { ...INITIAL_STATE, loading: false, profileUpdated: true}
        default:
            state
    }
}
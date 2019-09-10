import {
    POST_DETAIL_INIT,
    DETAIL_MODAL_CLOSE,
    DETAIL_MODAL_SHOW
} from '../actions/type'

const INITIAL_STATE = {
    username : '',
    photoUrl: '',
    image : '',
    userId : '',
    postId : '',
    detailModalShow: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case POST_DETAIL_INIT:
            return {...INITIAL_STATE, ...action.payload}
        case DETAIL_MODAL_SHOW:
            return { ...INITIAL_STATE, detailModalShow: true}
        case DETAIL_MODAL_CLOSE:
            return {...INITIAL_STATE, detailModalShow: false}
        default:
            return state
    }
}
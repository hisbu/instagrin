import { POST_DETAIL_INIT, DETAIL_MODAL_SHOW, DETAIL_MODAL_CLOSE } from './type'

export const postDetailInit = (username, photoUrl, image, userId, postId) => {
    return {
        type: POST_DETAIL_INIT,
        payload: {
            username,
            photoUrl,
            image,
            userId,
            postId
        }
    }
}

export const detailModalShowing = () =>{
    return {
        type: DETAIL_MODAL_SHOW
    }
}

export const detailModalClosing = () =>{
    return {
        type: DETAIL_MODAL_CLOSE
    }
}
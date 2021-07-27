import axios from "axios"
import URL from "../baseURL"

export const FEED_RETRIEVED = "FEED_RETRIEVED"
export const ADD_POST_FEEDBACK = "ADD_POST_FEEDBACK"
export const RESET_POST_STATE = "RESET_POST_STATE"
export const UPDATE_LIKE = "UPDATE_LIKE"
export const POSTS_ERROR = "POSTS_ERROR"
export const UPDATE_DELETED = "UPDATE_DELETED"
export const DELETE_FEEDBACK = "DELETE_FEEDBACK"

export const feedRetrieved = (posts) => ({
    type: FEED_RETRIEVED,
    payload: posts
})

export const addPostFeedback = (bool) => ({
    type: ADD_POST_FEEDBACK,
    payload: bool
})

export const resetPostState = () => ({
    type: RESET_POST_STATE
})

export const updateLike = (type, id, username) => ({
    type: UPDATE_LIKE,
    payload: {type, id, username}
})

export const postsError = (err) => ({
    type: POSTS_ERROR,
    payload: err
})

export const updateDeletedPost = (id) => ({
    type: UPDATE_DELETED,
    payload: id
})

export const deleteFeedback = (bool) => ({
    type: DELETE_FEEDBACK,
    payload: bool
})

export const fetchPosts = (type, username) => {
    return async (dispatch) => {
        try {
            let response, posts
            if (type === "feed") {
                response = await axios.get("/posts")
            }
            else if (type === "profile") {
                response = await axios.get(`/users/${username}/posts`)
            }
            posts = response.data.map(el => ({ ...el, author: { ...el.author, picture: `${URL}image/${el.author.picture}` } }))
            dispatch(feedRetrieved(posts))
        }
        catch (e) {
            dispatch(postsError(e.message))
        }
    }
}

export const addNewPost = (post, type, username) => {
    return async (dispatch) => {
        try {
            await axios.post("/posts", { content: post })
            dispatch(fetchPosts(type, username))
            dispatch(addPostFeedback(true))
        }
        catch (e) {
            dispatch(addPostFeedback(false))
        }
    }
}

export const likePost = (id) => {
    return async (dispatch, getState) => {
        try {
            await axios.post(`/posts/${id}/like`)
            dispatch(updateLike("like", id, getState().auth.user.username))
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const unlikePost = (id) => {
    return async (dispatch, getState) => {
        try {
            await axios.post(`/posts/${id}/unlike`)
            dispatch(updateLike("unlike", id, getState().auth.user.username))
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/posts/${id}`)
            dispatch(updateDeletedPost(id))
            dispatch(deleteFeedback(true))
        }
        catch (e) {
            dispatch(deleteFeedback(false))
        }
    }
}
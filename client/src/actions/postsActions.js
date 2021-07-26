import axios from "axios"
import URL from "../baseURL"

export const FEED_RETRIEVED = "FEED_RETRIEVED"
export const ADD_POST_FEEDBACK = "ADD_POST_FEEDBACK"
export const RESET_POST_STATE = "RESET_POST_STATE"

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

export const fetchFeed = () => {
    return async (dispatch) => {
        try {
            let response = await axios.get("/posts")
            console.log(response.data)
            let posts = response.data.map(el => ({ ...el, author: { ...el.author, picture: `${URL}image/${el.author.picture}` }}))
            dispatch(feedRetrieved(posts))
        }
        catch (e) {
            dispatch(addPostFeedback(false))
        }
    }
}

export const addNewPost = (post) => {
    return async (dispatch) => {
        try {
            await axios.post("/posts", { content: post })
            dispatch(fetchFeed())
            dispatch(addPostFeedback(true))
        }
        catch (e) {
            console.log(e)
            dispatch(addPostFeedback(false))
        }
    }
}
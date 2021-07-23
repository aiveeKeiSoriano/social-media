import axios from "axios"

export const FEED_RETRIEVED = "FEED_RETRIEVED"
export const ADD_POST_FEEDBACK = "ADD_POST_FEEDBACK"

export const feedRetrieved = (posts) => ({
    type: FEED_RETRIEVED,
    payload: posts
})

export const addPostFeedback = (bool) => ({
    type: ADD_POST_FEEDBACK,
    payload: bool
})

export const fetchFeed = () => {
    return async (dispatch) => {
        try {
            let response = await axios.get("/posts")
            console.log(response.data)
            let posts = response.data.map(el => ({...el, author: {...el.author, picture: "http://localhost:3333/image/" + el.author.picture}}))
            dispatch(feedRetrieved(posts))
        }
        catch (e) {
            console.log(e)
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
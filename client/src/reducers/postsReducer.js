import { ADD_POST_FEEDBACK, DELETE_FEEDBACK, FEED_RETRIEVED, POSTS_ERROR, RESET_POST_STATE, UPDATE_DELETED, UPDATE_LIKE } from "../actions/postsActions"

const initialState = {}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case FEED_RETRIEVED:
            return { ...state, feed: action.payload }
        case ADD_POST_FEEDBACK:
            return { ...state, addPostFeedback: action.payload }
        case UPDATE_LIKE:
            let copy = JSON.parse(JSON.stringify(state.feed))
            let index = copy.findIndex(el => el._id === action.payload.id)
            if (action.payload.type === "like") {
                copy[index].likes.push(action.payload.username)
            }
            else {
                copy[index].likes = copy[index].likes.filter(el => el !== action.payload.username)
            }
            return { ...state, feed: copy }
        case POSTS_ERROR:
            return { ...state, error: action.payload }
        case UPDATE_DELETED:
            let posts = JSON.parse(JSON.stringify(state.feed))
            posts = posts.filter(el => el._id !== action.payload)
            return { ...state, feed: posts }
        case DELETE_FEEDBACK:
            return { ...state, deleteFeedback: action.payload }
        case RESET_POST_STATE:
            return initialState
        default:
            return state
    }
}
import { ADD_POST_FEEDBACK, FEED_RETRIEVED, RESET_POST_STATE } from "../actions/postsActions"

const initialState = {}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case FEED_RETRIEVED:
            return { ...state, feed: action.payload }
        case ADD_POST_FEEDBACK:
            return { ...state, addPostFeedback: action.payload }
        case RESET_POST_STATE:
            return initialState
        default:
            return state
    }
}
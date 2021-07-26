import { RESET_FOLLOW_STATE, SUGGESTIONS_ERROR, SUGGESTIONS_RETRIEVED } from "../actions/followActions"

const initialState = {}

export default function followReducer(state = initialState, action) {
    switch (action.type) {
        case SUGGESTIONS_RETRIEVED:
            return { ...state, suggestions: action.payload }
        case SUGGESTIONS_ERROR:
            return { ...state, suggestionsErr: action.payload }
        case RESET_FOLLOW_STATE:
            return initialState
        default:
            return state
    }
}
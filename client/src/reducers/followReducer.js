import { SUGGESTIONS_RETRIEVED } from "../actions/followActions"

const initialState = {}

export default function followReducer(state = initialState, action) {
    switch (action.type) {
        case SUGGESTIONS_RETRIEVED:
            return { ...state, suggestions: action.payload }
        default:
            return state
    }
}
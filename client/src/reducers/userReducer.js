import { FORM_ERROR, LOGGED_OUT, USER_RETRIEVED } from "../actions/userActions";

const initialState = {}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_RETRIEVED:
            return { ...state, user: action.payload, logged: true }
        case FORM_ERROR:
            return { ...state, error: action.payload }
        case LOGGED_OUT:
            return { ...state, user: null, logged: false }
        default:
            return state
    }
}
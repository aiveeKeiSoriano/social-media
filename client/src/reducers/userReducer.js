import {  FORM_ERROR, LOGGED_OUT, SET_ERROR, SET_LOADING, USER_RETRIEVED } from "../actions/userActions";

const initialState = {}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_RETRIEVED:
            return { ...state, user: action.payload, logged: true }
        case SET_ERROR:
            return { ...state, error: action.payload }
        case LOGGED_OUT:
            return { ...state, user: null, logged: false }
        case FORM_ERROR:
            return { ...state, formError: action.payload }
        case SET_LOADING:
            return { ...state, loading: action.payload }
        default:
            return state
    }
}
import axios from "axios"
import URL from "../baseURL"
import { getUser } from "./userActions"

export const SUGGESTIONS_RETRIEVED = "SUGGESTIONS_RETRIEVED"
export const RESET_FOLLOW_STATE = "RESET_FOLLOW_STATE"
export const SUGGESTIONS_ERROR = "SUGGESTIONS_ERROR"

export const suggestionsRetrieved = (list) => ({
    type: SUGGESTIONS_RETRIEVED,
    payload: list
})

export const resetFollowState = () => ({
    type: RESET_FOLLOW_STATE
})

export const suggestionsError = (err) => ({
    type: SUGGESTIONS_ERROR,
    payload: err
}) 

export const fetchSuggestions = () => {
    return async (dispatch, getState) => {
        try {
            let response = await axios.get("/users")
            let currentFollowing = getState().auth.user.following.map(el => el.username)
            let list = response.data.filter(el => !currentFollowing.includes(el.username) && el.username !== getState().auth.user.username)
            let pictureURL = list.slice(0, 10).map(el => ({...el, picture: `${URL}image/${el.picture}`}))
            dispatch(suggestionsRetrieved(pictureURL))
        }
        catch (e) {
            dispatch(suggestionsError(e.message))
        }
    }
}

export const followUser = (username) => {
    return async (dispatch) => {
        try {
            await axios.post(`/users/${username}/follow`)
            dispatch(getUser())
        }
        catch (e) {
            console.log(e.message)
        }

    }
}

export const unfollowUser = (username) => {
    return async (dispatch) => {
        try {
            await axios.post(`/users/${username}/unfollow`)
            dispatch(getUser())
        }
        catch (e) {
            console.log(e.message)
        }

    }
}
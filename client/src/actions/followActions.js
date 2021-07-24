import axios from "axios"

export const SUGGESTIONS_RETRIEVED = "SUGGESTIONS_RETRIEVED"

export const suggestionsRetrieved = (list) => ({
    type: SUGGESTIONS_RETRIEVED,
    payload: list
})

export const fetchSuggestions = () => {
    return async (dispatch, getState) => {
        let response = await axios.get("/users")
        let currentFollowing = getState().auth.user.following.map(el => el.username)
        let list = response.data.filter(el => !currentFollowing.includes(el.username))
        dispatch(suggestionsRetrieved(list))
    }
}
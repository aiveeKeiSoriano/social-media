import axios from "axios"
import URL from "../baseURL"
import { resetFollowState } from "./followActions"
import { resetPostState } from "./postsActions"

export const USER_RETRIEVED = "USER_RETRIEVED"
export const LOGGED_OUT = "LOGGED_OUT"
export const FORM_ERROR = "FORM_ERROR"
export const SET_ERROR = "SET_ERROR"
export const SET_LOADING = "SET_LOADING"

export const userRetrieved = (user) => ({
    type: USER_RETRIEVED,
    payload: user
})

export const loggedOut = () => ({
    type: LOGGED_OUT
})

export const setError = (err) => ({
    type: SET_ERROR,
    payload: err
})

export const formError = (err) => ({
    type: FORM_ERROR,
    payload: err
})

export const setLoading = (bool) => ({
    type: SET_LOADING,
    payload: bool
})

export const signUp = (data, history) => {
    return async (dispatch) => {
        try {
            await axios.post("/auth/signup", data)
            dispatch(formError(""))
            dispatch(setLoading(false))
            history.push("/login")
        }
        catch (err) {
            if (err.response) {
                let { data } = err.response
                if (data.message.match("dup key: { username")) {
                    dispatch(formError("Username already taken"))
                }
                else if (data.message.match("dup key: { email")) {
                    dispatch(formError("Email already taken"))
                }
                else dispatch(formError(data.message))
            }
            else dispatch(formError(err.message))
        }
    }
}

export const logIn = (data) => {
    return async (dispatch) => {
        try {
            let response = await axios.post("/auth/signin", data)
            let { access_token, refresh_token } = response.data
            localStorage.setItem("access_token", access_token)
            localStorage.setItem("refresh_token", refresh_token)
            dispatch(setLoading(false))
            dispatch(getUser())
        }
        catch (err) {
            console.log(err)
            if (err.response) {
                console.log(err.response)
                let { data } = err.response
                dispatch(formError(data.message))
            }
            else dispatch(formError(err.message))
        }
    }
}

export const checkLogIn = () => {
    return async (dispatch) => {
        let access_token = localStorage.getItem("access_token")
        if (!access_token) {
            dispatch(loggedOut())
        }
        else {
            dispatch(getUser())
        }
    }
}

export const getUser = () => {
    return async (dispatch) => {
        try {
            let response = await axios.get("/me")
            response.data.picture = `${URL}image/${response.data.picture}`
            dispatch(userRetrieved(response.data))
        }
        catch (e) {
            dispatch(setError(e.message))
        }
    }
}

export const logOut = () => {
    return async (dispatch) => {
        try {
            let refresh_token = localStorage.getItem("refresh_token")
            await axios.post("/auth/signout", { refresh_token })
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("access_token")
            dispatch(resetPostState())
            dispatch(resetFollowState())
            dispatch(loggedOut())
        }
        catch (e) {
            dispatch(setError(e.message))
        }
    }
}
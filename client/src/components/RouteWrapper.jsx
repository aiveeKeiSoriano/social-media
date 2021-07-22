
import { Switch, Route, useHistory } from "react-router-dom"
import initAxios from "../axios-config"
import Login from "./Login"
import Signup from "./Signup"
import Feed from "./Feed"
import Main from "./Main"
import { checkLogIn } from "../actions/userActions"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function RouteWrapper() {

    let history = useHistory()
    initAxios(history)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkLogIn())
        // eslint-disable-next-line
    }, [])

    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/feed">
                <Feed />
            </Route>
            <Route path="/">
                <Main />
            </Route>
        </Switch>
    )
}
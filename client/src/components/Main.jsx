import { Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Wrapper from "./Wrapper"

export default function Main() {

    let logged = useSelector(state => state.auth.logged)
    let history = useHistory()

    useEffect(() => {
        if (logged) {
            history.push("/feed")
        }
        else if (logged === false) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [logged])

    return (
        <Wrapper>
            <Spinner size="xl" />
        </Wrapper>
    )
}
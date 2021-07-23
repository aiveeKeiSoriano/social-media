import { Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Error from "./Error"
import Wrapper from "./FormWrapper"

export default function Main() {

    let logged = useSelector(state => state.auth.logged)
    let error = useSelector(state => state.auth.error)
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

    console.log(error)

    return (
        <Wrapper>
            {error ?
                <Error error={error} />
                : <Spinner size="xl" />
            }
        </Wrapper>
    )
}
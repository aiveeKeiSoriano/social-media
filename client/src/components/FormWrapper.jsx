import { Center } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import Error from "./Error"

export default function FormWrapper(props) {

    let error = useSelector(state => state.auth.error)

    return (
        <Center w="100vw" h="100vh">
            {error ?
                <Error error={error} />
                :
                <>
                    {props.children}
                </>
            }
        </Center>
    )
}
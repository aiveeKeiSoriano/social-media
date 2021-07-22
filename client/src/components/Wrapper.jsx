import { Center } from "@chakra-ui/react"

export default function Wrapper(props) {
    return (
        <Center w="100vw" h="100vh">
            {props.children}
        </Center>
    )
}
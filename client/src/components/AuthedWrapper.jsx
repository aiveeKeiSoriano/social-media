
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "./Loading"
import { Flex } from "@chakra-ui/react"
import Nav from "./Nav"

export default function Feed({ children }) {

    let logged = useSelector(state => state.auth.logged)
    let history = useHistory()

    useEffect(() => {
        if (logged === false) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [logged])

    return (
        <>
            {logged ?
                <Flex w="100%" h="100vh" direction="column" bg="gray.100" overflow="hidden">
                    <Nav />
                    <Flex w="100%" justifyContent="center" flex="1" m={1} overflowY="scroll">
                        {children}
                    </Flex>
                </Flex>
                : <Loading />
            }
        </>
    )
}
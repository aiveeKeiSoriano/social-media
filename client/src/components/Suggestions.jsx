
import { VStack, Heading, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSuggestions } from "../actions/followActions"

export default function Suggestions() {

    let list = useSelector(state => state.follow.suggestions)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSuggestions())
        // eslint-disable-next-line
    }, [])

    return (
        <VStack minH="100%" w="300px" p={4} bg="white" position="fixed" right="0">
            <Heading size="md">People you can follow</Heading>
            {list ?
                <VStack>
                    {list.map(el => <Text key={el.username}>{el.username}</Text>)}
                </VStack>
                : <Text>No list</Text>
            }
        </VStack>
    )
}
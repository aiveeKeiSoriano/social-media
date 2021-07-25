
import { VStack, Heading, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSuggestions } from "../actions/followActions"
import styled from "styled-components"
import SuggestionCard from "./SuggestionCard"

const Sticky = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);
    gap: 1.5em;
    width: 300px;
    padding: 2em 1em;
    background-color: white;
    position: sticky;
    bottom: 0px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 4px 4px -1px rgba(0, 0, 0, 0.06);
    border-right: 5px solid #3182ceb7;
`

export default function Suggestions() {

    let list = useSelector(state => state.follow.suggestions)
    let user = useSelector(state => state.auth.user)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSuggestions())
        // eslint-disable-next-line
    }, [user])

    //find way to make heading bigger

    return (
        <Sticky>
            <Heading size="md" w="100%" textAlign="center">People you can follow</Heading>
            {list ?
                <VStack align="flex-start">
                    {list.map(el => <SuggestionCard key={el.username} user={el} />)}
                </VStack>
                : <Text>No list</Text>
            }
        </Sticky>
    )
}
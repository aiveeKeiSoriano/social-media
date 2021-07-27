
import { VStack, Heading, HStack, SkeletonCircle, Skeleton, Center, Button, Icon, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSuggestions, suggestionsError } from "../actions/followActions"
import styled from "styled-components"
import SuggestionCard from "./SuggestionCard"
import { AiOutlineReload } from "react-icons/ai"

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
    let error = useSelector(state => state.follow.suggestionsErr)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSuggestions())
        // eslint-disable-next-line
    }, [user])

    function reload() {
        dispatch(suggestionsError(null))
        dispatch(fetchSuggestions())
    }

    //find way to make heading bigger

    return (
        <Sticky>
            <Heading fontSize="23px" w="100%" textAlign="center">People you can follow</Heading>
            {error ?
                <VStack p={4} w="100%" spacing={2}>
                    <Text fontSize="md" color="gray.400">
                        Something went wrong!
                    </Text>
                    <Button size="sm" colorScheme="gray" onClick={reload} rightIcon={<Icon as={AiOutlineReload} />}>
                        Reload
                    </Button>
                </VStack>
                : !list ?
                <VStack align="flex-start">
                    <SuggestionSkeleton />
                    <SuggestionSkeleton />
                    <SuggestionSkeleton />
                </VStack>
                : list.length === 0 ?
                    <Center w="100%" p={4}>
                        <Heading size="md" color="gray.400">There's no one here</Heading>
                    </Center>
                    :
                    <VStack align="flex-start">
                        {list.map(el => <SuggestionCard key={el.username} user={el} />)}
                    </VStack>
            }
        </Sticky>
    )
}

function SuggestionSkeleton() {
    return (
        <HStack w="100%" p={4} spacing={4}>
            <SkeletonCircle size="10" />
            <Skeleton height="20px" flex="1" />
            <Skeleton height="20px" flex="1" />
        </HStack>
    )
}
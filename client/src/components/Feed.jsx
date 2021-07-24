import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFeed } from "../actions/postsActions"
import AuthedWrapper from "./AuthedWrapper"
import PostSkeleton from "./PostSkeleton"
import { VStack, Heading, Box, Flex, Text } from "@chakra-ui/react"
import NewPostDialog from "./NewPostDialog"
import Post from "./Post"
import Suggestions from "./Suggestions"
import styled from "styled-components"

const CustomFlex = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

export default function Feed() {

    let dispatch = useDispatch()
    let feed = useSelector(state => state.posts.feed)

    let [time, setTime] = useState(new Date())

    useEffect(() => {
        dispatch(fetchFeed())
        let timeInterval = setInterval(() => setTime(new Date()), 60000)
        return () => clearInterval(timeInterval)
        // eslint-disable-next-line
    }, [])

    return (
        <AuthedWrapper>
            <Flex w="100%">
                <Flex w="calc(100% - 300px)" h="100%" position="relative">
                    <CustomFlex>
                        {
                            feed?.length === 0 ?
                                <Heading size="lg" align="center" p="2em" color="gray.400">Follow more people to see their posts</Heading>
                                : !feed ?
                                    <VStack w="100%" maxW="900px" p={8} align="flex-start" spacing={4}>
                                        <PostSkeleton />
                                        <PostSkeleton />
                                    </VStack>
                                    :
                                    <Flex w="100%" direction="column" maxW="900px" p={8} align="flex-start">
                                        {feed.map(el => <Post key={el._id} post={el} time={time} />)}
                                        <Box w="100%" h="100px"><Text color="transparent" style={{ userSelect: "none" }}>The white space after the feed is not showing. Why?</Text></Box>
                                    </Flex>
                        }
                    </CustomFlex>
                    <NewPostDialog />
                </Flex>
                <Suggestions />
            </Flex>
        </AuthedWrapper>
    )
}
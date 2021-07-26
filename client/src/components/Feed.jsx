import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFeed } from "../actions/postsActions"
import AuthedWrapper from "./AuthedWrapper"
import PostSkeleton from "./PostSkeleton"
import { VStack, Heading, Flex } from "@chakra-ui/react"
import NewPostDialog from "./NewPostDialog"
import Post from "./Post"
import Suggestions from "./Suggestions"
import styled from "styled-components"

const CustomFlex = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    /* overflow-y: scroll; */

    /* &::-webkit-scrollbar {
        display: none;
    } */
`

export default function Feed() {

    let dispatch = useDispatch()
    let feed = useSelector(state => state.posts.feed)
    let user = useSelector(state => state.auth.user)

    let [time, setTime] = useState(new Date())

    useEffect(() => {
        let timeInterval = setInterval(() => setTime(new Date()), 60000)
        return () => clearInterval(timeInterval)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setTime(new Date())
    }, [feed])

    useEffect(() => {
        if (user) {
            dispatch(fetchFeed())
        }
        // eslint-disable-next-line
    }, [user])

    return (
        <AuthedWrapper>
            <Flex w="100%" align="flex-end">
                <Suggestions />
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
                                    </Flex>
                        }
                    </CustomFlex>
                    <NewPostDialog />
                </Flex>
            </Flex>
        </AuthedWrapper>
    )
}
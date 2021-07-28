
import AuthedWrapper from "./AuthedWrapper"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import { VStack, Circle, AspectRatio, Image, Heading, HStack, Button, Flex, Center } from "@chakra-ui/react"
import URL from "../baseURL"
import { followUser, unfollowUser } from "../actions/followActions"
import Post from "./Post"
import PostSkeleton from "./PostSkeleton"
import styled from "styled-components"
import { feedRetrieved, fetchPosts, postsError } from "../actions/postsActions"
import NewPostDialog from "./NewPostDialog"
import defaultavatar from "../images/defaultavatar.jpg"

const Sticky = styled.div`
    position: sticky;
    top: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25em;
    padding: 2em;
`

export default function Profile() {

    let [user, setUser] = useState()
    let [error, setError] = useState(false)
    let [time, setTime] = useState(new Date())
    let [image, setImage] = useState()

    let [disableFollow, setDisableFollow] = useState(false)

    let params = useParams()

    let currentUser = useSelector(state => state.auth.user)
    let posts = useSelector(state => state.posts.feed)
    let postError = useSelector(state => state.posts.error)
    let dispatch = useDispatch()

    let fetchUser = async () => {
        try {
            let response = await axios.get(`/users/${params.username}`)
            response.data.picture = `${URL}uploads/${response.data.picture}`
            setUser(response.data)
        }
        catch (e) {
            if (e.response.data.message === "User not found") {
                setError(true)
            }
        }
    }

    useEffect(() => {
        setDisableFollow(false)
        if (currentUser) {
            if (currentUser.username !== params.username) {
                fetchUser()
            }
            else setUser(currentUser)
        }
        let timeInterval = setInterval(() => setTime(new Date()), 60000)
        return () => clearInterval(timeInterval)
        // eslint-disable-next-line
    }, [currentUser, params.username])

    useEffect(() => {
        dispatch(postsError(null))
        dispatch(feedRetrieved(null))
        if (params.username) {
            dispatch(fetchPosts("profile", params.username))
        }
        // eslint-disable-next-line
    }, [params.username])

    useEffect(() => {
        if (user) {
            setImage(user.picture)
        }
    }, [user])

    let isFollowing = () => {
        return currentUser.following.find(el => el.username === user.username)
    }


    return (
        <AuthedWrapper>
            {currentUser && user &&
                <Flex w="100%" justify="center" align="flex-start">
                    <Sticky>
                        <Circle boxShadow="md" size="180px" overflow="hidden">
                            <AspectRatio w="100%" ratio={1}>
                                <Image src={image} onError={() => setImage(defaultavatar)} alt="avatar" objectFit="cover" />
                            </AspectRatio>
                        </Circle>
                        <VStack spacing={3}>
                            <Heading size="lg">{user.username}</Heading>
                            <HStack spacing={6}>
                                <HStack spacing={1}><Heading size="md">{user.followers.length + " "}</Heading><Heading color="gray.600" size="sm"> Followers</Heading></HStack>
                                <HStack spacing={1}><Heading size="md">{user.following.length + " "}</Heading><Heading color="gray.600" size="sm"> Following</Heading></HStack>
                            </HStack>
                        </VStack>
                        {
                            currentUser.username === user.username ?
                                null
                                : isFollowing() ?
                                    <Button
                                        isDisabled={disableFollow}
                                        onClick={() => {
                                            setDisableFollow(true)
                                            dispatch(unfollowUser(user.username))
                                        }} colorScheme="blue" w="100px" variant="outline">Unfollow</Button>
                                    :
                                    <Button
                                        isDisabled={disableFollow}
                                        onClick={() => {
                                            setDisableFollow(true)
                                            dispatch(followUser(user.username))
                                        }} colorScheme="blue" w="100px" >Follow</Button>
                        }
                    </Sticky>
                    {postError ?
                        <Center h="300px" w="100%" maxW="900px">
                            <Heading size="lg" color="gray.400">Error fetching posts</Heading>
                        </Center>
                        : !posts ?
                            <VStack w="100%" maxW="900px" p={8} align="flex-start" spacing={4}>
                                <PostSkeleton />
                                <PostSkeleton />
                            </VStack>
                            : posts.length === 0 ?
                                <Center h="300px" w="100%" maxW="900px">
                                    <Heading size="lg" color="gray.400">There's nothing here yet</Heading>
                                </Center>
                                :
                                <Flex w="100%" direction="column" maxW="900px" p={8} align="flex-start">
                                    {posts.map(el => <Post key={el._id} post={el} time={time} />)}
                                </Flex>
                    }
                    {currentUser.username === user.username &&
                        <NewPostDialog />
                    }
                </Flex>
            }
            {error &&
                <Heading p={6} color="gray.400">404: User not Found</Heading>
            }
        </AuthedWrapper>
    )
}
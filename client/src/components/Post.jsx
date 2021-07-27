import { Box, Heading, Text, AspectRatio, Image, Circle, VStack, HStack, IconButton, Icon, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, likePost, unlikePost } from "../actions/postsActions"
import { useEffect, useState } from "react"
import defaultavatar from "../images/defaultavatar.jpg"
import { GoKebabVertical } from "react-icons/go"

export default function Post({ post, time }) {

    let [disableLike, setDisableLike] = useState(false)

    let user = useSelector(state => state.auth.user)
    let dispatch = useDispatch()

    function formatDate(date) {
        let current = time.getTime() - 1000
        let given = new Date(date).getTime()
        let diff = current - given
        if (diff < 60000) {
            return Math.floor(diff / 1000) + "s"
        }
        if (diff < 3.6e+6) {
            return Math.floor(diff / 60000) + "m"
        }
        if (diff < 8.64e+7) {
            return Math.floor(diff / 3.6e+6) + "h"
        }
        if (diff < 6.048e+8) {
            return Math.floor(diff / 8.64e+7) + "d"
        }
        let splitDate = new Date(date).toLocaleString().split(",")
        let splitTime = splitDate[1].split(":")
        return splitDate[0] + splitTime[0] + ":" + splitTime[1] + splitTime[2].substring(3)
    }

    let dispatchUnlike = (id) => {
        setDisableLike(true)
        dispatch(unlikePost(id))
    }

    let dispatchLike = (id) => {
        setDisableLike(true)
        dispatch(likePost(id))
    }

    useEffect(() => {
        setDisableLike(false)
    }, [post])


    let [image, setImage] = useState(post.author.picture)

    return (
        <Box borderColor="gray.300" borderWidth="2px" p="2em 2em 1.5em 2em" w="100%" bg="white" mb={4} boxShadow="lg" borderRadius="10px">
            <HStack spacing={4} align="flex-start">
                <Link to={`/profile/${post.author.username}`}>
                    <Circle boxShadow="base" size="50px" overflow="hidden">
                        <AspectRatio w="100%" ratio={1}>
                            <Image src={image} onError={() => setImage(defaultavatar)} alt="avatar" objectFit="cover" />
                        </AspectRatio>
                    </Circle>
                </Link>
                <VStack align="flex-start" flex="1">
                    <HStack>
                        <Link to={`/profile/${post.author.username}`}><Heading _hover={{ textDecoration: "underline" }} size="md">{post.author.username}</Heading></Link>
                        <Text fontWeight="500" color="gray.500" fontSize="xs">{formatDate(post.createdAt)}</Text>
                    </HStack>
                    <Text w="95%">{post.content}</Text>
                    <HStack pt={2}>
                        {
                            post.likes.includes(user.username) ?
                                <IconButton isDisabled={disableLike} onClick={() => dispatchUnlike(post._id)} size="sm" icon={<Icon boxSize={5} as={AiFillLike} />} />
                                :
                                <IconButton isDisabled={disableLike} onClick={() => dispatchLike(post._id)} size="sm" icon={<Icon boxSize={5} as={AiOutlineLike} />} />
                        }
                        <Text fontWeight="500" color="gray.500" fontSize="sm">{post.likes.length} likes</Text>
                    </HStack>
                </VStack>
                {post.author.username === user.username &&
                    <Menu>
                        <MenuButton cursor="pointer">
                            <IconButton size="sm" icon={<Icon as={GoKebabVertical} boxSize={5} />} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => dispatch(deletePost(post._id))}>Delete</MenuItem>
                        </MenuList>
                    </Menu>
                }
            </HStack>
        </Box>
    )
}
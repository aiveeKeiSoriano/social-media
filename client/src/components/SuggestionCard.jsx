import { VStack, HStack, Heading, Circle, AspectRatio, Image, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components"
import { Link } from "react-router-dom"
import { followUser } from "../actions/followActions";
import defaultavatar from "../images/defaultavatar.jpg"

const CustomCard = styled.div`
    display: flex;
    width: 100%;
    padding: 1em;
    justify-content: space-between;
    gap: 1em;
    border-bottom: 2px solid #e2e2e2;
    align-items: center;

    &:last-child {
        border-bottom: 2px solid transparent;
    }
`

export default function SuggestionCard({ user }) {

    let [followed, setFollowed] = useState(false)
    let dispatch = useDispatch()

    let follow = () => {
        setFollowed(true)
        dispatch(followUser(user.username))
    }

    let [image, setImage] = useState(user.picture)

    return (
        <CustomCard >
            <HStack spacing={4}>
                <Link to={`/profile/${user.username}`}>
                    <Circle boxShadow="base" size="50px" overflow="hidden">
                        <AspectRatio w="100%" ratio={1}>
                            <Image src={image} onError={() => setImage(defaultavatar)} alt="avatar" objectFit="cover" />
                        </AspectRatio>
                    </Circle>
                </Link>
                <VStack spacing={0} align="flex-start">
                    <Link to={`/profile/${user.username}`}><Heading _hover={{ textDecoration: "underline" }} size="sm">{user.username}</Heading></Link>
                    <Text fontSize="xs" color="gray.500">{user.followersTotal} followers</Text>
                </VStack>
            </HStack>
            {followed ?
                <Button size="xs" colorScheme="blue">Following</Button>
                :
                <Button onClick={follow} variant="outline" size="xs" colorScheme="blue">Follow</Button>
            }
        </CustomCard>
    )
}
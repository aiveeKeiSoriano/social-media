import { VStack, HStack, Heading, Circle, AspectRatio, Image, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components"
import { followUser } from "../actions/followActions";

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

    return (
        <CustomCard >
            <HStack spacing={4}>
                <Circle boxShadow="base" size="50px" overflow="hidden">
                    <AspectRatio w="100%" ratio={1}>
                        <Image src={user.picture} alt="avatar" objectFit="cover" />
                    </AspectRatio>
                </Circle>
                <VStack spacing={0} align="flex-start">
                    <Heading size="sm">{user.username}</Heading>
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
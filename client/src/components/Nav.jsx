import { Flex, Heading, Circle, Menu, MenuButton, MenuList, MenuItem, AspectRatio, Image, Center } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { logOut } from "../actions/userActions"

export default function Nav() {
    let user = useSelector(state => state.auth.user)
    let dispatch = useDispatch()
//maxW="1100px"
    return (
        <Center boxShadow="md" h="80px" w="100vw" bg="white" position="fixed" zIndex="1">
            <Flex w="100%"  justify="space-between" p=".8em 2em" align="center">
                <Heading size="xl" color="blue.500">ShoutOut</Heading>
                <Menu>
                    <MenuButton cursor="pointer" as={Circle} boxShadow="base" size="50px" overflow="hidden">
                        <AspectRatio maxW="100%" ratio={1}>
                            <Image src={user?.picture} alt="avatar" objectFit="cover" />
                        </AspectRatio>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>My Profile</MenuItem>
                        <MenuItem onClick={() => dispatch(logOut())}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Center>
    )
}
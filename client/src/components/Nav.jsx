import { Flex, Heading, Circle, Menu, MenuButton, MenuList, MenuItem, AspectRatio, Image, Center } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { logOut } from "../actions/userActions"
import { Link } from "react-router-dom"

export default function Nav() {
    let user = useSelector(state => state.auth.user)
    let dispatch = useDispatch()

    return (
        <Center boxShadow="md" h="80px" w="100vw" bg="white" position="fixed" zIndex="1">
            <Flex w="100%"  justify="space-between" p=".8em 2em" align="center">
            <Link to={"/feed"}><Heading cursor="pointer" size="xl" color="blue.500">ShoutOut</Heading></Link>
                <Menu>
                    <MenuButton cursor="pointer" as={Circle} boxShadow="base" size="50px" overflow="hidden">
                        <AspectRatio maxW="100%" ratio={1}>
                            <Image src={user?.picture} alt="avatar" objectFit="cover" />
                        </AspectRatio>
                    </MenuButton>
                    <MenuList>
                        <Link to={`/profile/${user.username}`}><MenuItem>My Profile</MenuItem></Link>
                        <MenuItem onClick={() => dispatch(logOut())}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Center>
    )
}
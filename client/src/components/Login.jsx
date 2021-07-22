import Wrapper from "./Wrapper";
import { Center, VStack, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Button, Icon, Text } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import { formError, logIn } from "../actions/userActions";
import Loading from "./Loading"

export default function Login() {

    let [showPass, setShowPass] = useState(false)

    let username = useRef()
    let password = useRef()

    let error = useSelector(state => state.auth.error)
    let logged = useSelector(state => state.auth.logged)

    let history = useHistory()

    useEffect(() => {
        if (logged) {
            history.push("/feed")
        }
        // eslint-disable-next-line
    }, [logged])

    let dispatch = useDispatch()

    let submitForm = () => {
        if (username.current.value === "") {
            dispatch(formError("Username cannot be empty"))
            return
        }
        if (password.current.value === "") {
            dispatch(formError("Password cannot be empty"))
            return
        }
        let data = {
            "username": username.current.value,
            "password": password.current.value
        }
        dispatch(logIn(data))
    }

    useEffect(() => dispatch(formError(""))
        // eslint-disable-next-line
        , [])

    return (
        <>
            {logged === false ?
                <Wrapper>
                    <Center w="100%" maxW="350px" p={8}>
                        <VStack spacing={10} w="100%">
                            <Heading size="xl">
                                ShoutOut
                            </Heading>
                            <VStack align="flex-start" w="100%" spacing={4}>
                                <Heading size="lg">
                                    Login
                                </Heading>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<Icon as={AiOutlineUser} />}
                                    />
                                    <Input placeholder="Username" ref={username} />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<Icon as={AiOutlineLock} />}
                                    />
                                    <Input type={showPass ? "text" : "password"} placeholder="Password" ref={password} />
                                    <InputRightElement
                                        onClick={() => setShowPass(p => !p)}
                                        children={showPass ? <Icon as={AiOutlineEye} /> : <Icon as={AiOutlineEyeInvisible} />} />
                                </InputGroup>
                                <Center w="100%">
                                    <Button colorScheme="blue" onClick={submitForm}>Submit</Button>
                                </Center>
                                <Text color="red.500" fontSize="sm">{error}</Text>
                            </VStack>
                            <Link to="/signup"><Text color="blue.500">Don't have an account? Sign up.</Text></Link>
                        </VStack>
                    </Center>
                </Wrapper>
                : <Loading />
            }
            </>
    )
}
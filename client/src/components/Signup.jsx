import Wrapper from "./Wrapper";
import { Center, VStack, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Button, Icon, Text } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineCamera, AiOutlineEyeInvisible, AiOutlineMail } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { formError, signUp } from "../actions/userActions";
import Loading from "./Loading"

export default function Signup() {

    let [showPass, setShowPass] = useState(false)
    let [image, setImage] = useState()
    let error = useSelector(state => state.auth.error)
    let logged = useSelector(state => state.auth.logged)

    let username = useRef()
    let email = useRef()
    let password = useRef()
    let confirmpass = useRef()

    let dispatch = useDispatch()
    let history = useHistory()

    let submitForm = () => {
        if (username.current.value === "") {
            dispatch(formError("Username cannot be empty"))
            return
        }
        if (email.current.value === "") {
            dispatch(formError("Email cannot be empty"))
            return
        }
        let emailRegex = /\S+[@]\S+[.]\S+/
        if (!emailRegex.test(email.current.value)) {
            dispatch(formError("Invalid email format"))
            return
        }
        if (password.current.value === "") {
            dispatch(formError("Password cannot be empty"))
            return
        }
        if (password.current.value.length < 6) {
            dispatch(formError("Password must be at least 6 characters"))
            return
        }
        if (confirmpass.current.value === "") {
            dispatch(formError("Please confirm your password"))
            return
        }
        if (password.current.value !== confirmpass.current.value) {
            dispatch(formError("Passwords did not match"))
            return
        }

        let formData = new FormData()
        formData.append('username', username.current.value)
        formData.append('email', email.current.value)
        formData.append('password', password.current.value)
        if (image) formData.append('picture', image)

        dispatch(signUp(formData, history))
    }

    useEffect(() => dispatch(formError(""))
        // eslint-disable-next-line
        , [])

    useEffect(() => {
        if (logged) {
            history.push("/feed")
        }
        // eslint-disable-next-line
    }, [logged])

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
                                <Heading size="lg">Sign Up</Heading>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<Icon as={AiOutlineUser} />}
                                    />
                                    <Input placeholder="Username" ref={username} />
                                </InputGroup><InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<Icon as={AiOutlineMail} />}
                                    />
                                    <Input placeholder="Email" ref={email} />
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
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<Icon as={AiOutlineLock} />}
                                    />
                                    <Input type="password" placeholder="Confirm Password" ref={confirmpass} />
                                </InputGroup>
                                <input accept="image/*" id="picture" style={{ display: "none" }} value={""} type="file" name="picture" onChange={(e) => setImage(e.target.files[0])} />
                                <label htmlFor="picture" style={{ display: "flex", gap: ".5em", alignItems: "center" }}>
                                    <Button size="sm" colorScheme="gray" as="span" variant="outline" leftIcon={<Icon as={AiOutlineCamera} />}>Upload Avatar</Button>
                                    {image?.name}
                                </label>
                                <Center w="100%">
                                    <Button colorScheme="blue" onClick={submitForm}>Submit</Button>
                                </Center>
                                <Text color="red.500" fontSize="sm">{error}</Text>
                            </VStack>
                            <Link to="/login"><Text color="blue.500">Already have an account? Log in.</Text></Link>
                        </VStack>
                    </Center>
                </Wrapper>
                : <Loading />}
        </>
    )
}
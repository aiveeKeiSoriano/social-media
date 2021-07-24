import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    IconButton,
    useToast
} from "@chakra-ui/react"

import { AddIcon } from '@chakra-ui/icons'
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewPost, addPostFeedback } from "../actions/postsActions"

export default function NewPostDialog() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    let postFeedback = useSelector(state => state.posts.addPostFeedback)

    let toast = useToast()

    let input = useRef()
    let dispatch = useDispatch()

    let post = () => {
        if (!input.current.value) return
        dispatch(addNewPost(input.current.value, onClose))
        onClose()
        input.current.value = ""
    }

    useEffect(() => {
        if (postFeedback) {
            toast({
                title: "Posted successfully!",
                status: "success",
                duration: 1000
            })
            dispatch(addPostFeedback(null))
        }
        else if (postFeedback === false) {
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 1000
            })
            dispatch(addPostFeedback(null))
        }
        // eslint-disable-next-line
    }, [postFeedback])

    return (
        <>
            <IconButton
                onClick={onOpen}
                pos="absolute"
                bottom="2em"
                right="3em"
                w="60px"
                h="60px"
                borderRadius="50%"
                colorScheme="blue"
                icon={<AddIcon boxSize={6} />}
            />

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input as="textarea" h="180px" p={4} placeholder="Hello world" ref={input}>
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={post}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
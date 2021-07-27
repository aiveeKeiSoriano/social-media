
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "./Loading"
import { Flex, useToast } from "@chakra-ui/react"
import Nav from "./Nav"
import { deleteFeedback } from "../actions/postsActions";

export default function AuthedWrapper({ children }) {

    let logged = useSelector(state => state.auth.logged)
    let deleteState = useSelector(state => state.posts.deleteFeedback)
    let history = useHistory()
    let dispatch = useDispatch()
    
    let toast = useToast()

    useEffect(() => {
        if (logged === false) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [logged])

    useEffect(() => {
        if (deleteState) {
            toast({
                title: "Deleted successfully!",
                status: "success",
                duration: 1000
            })
            dispatch(deleteFeedback(null))
        }
        else if (deleteState === false) {
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 1000
            })
            dispatch(deleteFeedback(null))
        }
        // eslint-disable-next-line
    }, [deleteState])

    return (
        <>
            {logged ?
                <Flex w="100%" minH="100vh" direction="column" bg="gray.100" >
                    <Nav />
                    <Flex w="100%" justifyContent="center" flex="1" mt="80px">
                        {children}
                    </Flex>
                </Flex>
                : <Loading />
            }
        </>
    )
}
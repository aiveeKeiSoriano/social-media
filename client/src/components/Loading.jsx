import { Spinner } from "@chakra-ui/react"
import Wrapper from "./Wrapper"

export default function Loading() {
    return (
        <Wrapper>
            <Spinner size="xl" />
        </Wrapper>
    )
}
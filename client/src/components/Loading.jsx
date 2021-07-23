import { Spinner } from "@chakra-ui/react"
import Wrapper from "./FormWrapper"

export default function Loading() {
    return (
        <Wrapper>
            <Spinner size="xl" />
        </Wrapper>
    )
}
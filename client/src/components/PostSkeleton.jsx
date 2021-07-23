import {Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

export default function PostSkeleton() {
    return (
        <Box padding="6" w="100%" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
    )
}
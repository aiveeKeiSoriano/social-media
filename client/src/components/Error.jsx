
import { Box, Heading, VStack, Text } from "@chakra-ui/react"

export default function Error({ error }) {
    return (
        <Box maxW="800px" w="100vw" h="100vh" p="5em 3em">
            <VStack spacing={6} align="flex-start">
                <Heading size="2xl" color="blue.500">Error!</Heading>
                <Text as="i" fontWeight="600" color="gray.600">Error message: {error}</Text>
            </VStack>
        </Box>
    )
}
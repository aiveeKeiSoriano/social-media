import { Box, Heading, Text, AspectRatio, Image, Circle, VStack, HStack } from "@chakra-ui/react"

export default function Post({ post, time }) {

    function formatDate(date) {
        let current = time.getTime()
        let given = new Date(date).getTime()
        let diff = current - given
        if (diff < 60000) {
            return Math.floor(diff/1000) + "s"
        }
        if (diff < 3.6e+6) {
            return Math.floor(diff/60000) + "m" 
        }
        if (diff < 8.64e+7) {
            return Math.floor(diff/3.6e+6) + "h"
        }
        return new Date(date).toLocaleString()
    }

    return (
        <Box borderColor="gray.300" borderWidth="2px" p="2em 1.5em" w="100%" bg="white" mb={4} boxShadow="lg" borderRadius="10px">
            <HStack spacing={4} align="flex-start">
                <Circle boxShadow="base" size="50px" overflow="hidden">
                    <AspectRatio w="100%" ratio={1}>
                        <Image src={post.author.picture} alt="avatar" objectFit="cover" />
                    </AspectRatio>
                </Circle>
                <VStack align="flex-start">
                    <HStack>
                        <Heading size="md">{post.author.username}</Heading>
                        <Text fontWeight="500" color="gray.500" fontSize="xs">{formatDate(post.createdAt)}</Text>
                    </HStack>
                    <Text>{post.content}</Text>
                </VStack>
            </HStack>
        </Box>
    )
}
import { Box, Button, Divider, Text, Textarea, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'

const GitSidebar = () => {
    const { colorMode, } = useColorMode()
    return (
        <Box width="300px" background={colorMode === "light" ? "white" : "gray.800"} className="git-background" height="100vh">
            <VStack spacing={2} align="left">
                <Box padding="20px 20px 10px 20px">
                    <Text colorScheme="gray" fontWeight="500">SOURCE CODE</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="500">Sync your source code</Text>
                </Box>
                <VStack spacing={3} align="left" padding="8px 15px">
                    <Textarea placeholder="Message" variant="filled" size="md" height="120px" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                    <Button colorScheme="green" size="sm" width="100%">Commit & Push</Button>
                </VStack>
                <Divider color="gray.500" />

                <VStack spacing={2} align="left" padding="5px 15px">
                    <Box>
                        <Text color="gray.500" fontWeight="500">Changes</Text>
                    </Box>
                </VStack>
            </VStack>
        </Box>
    )
}

export default GitSidebar

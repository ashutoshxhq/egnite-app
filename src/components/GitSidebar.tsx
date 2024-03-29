import { Box, Button, Divider, Text, Textarea, useColorMode, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const GitSidebar = () => {
    const { colorMode, } = useColorMode()
    const [message, setMessage] = useState("")
    const [generating, setGenerating] = useState(false)

    const handleGenerateCode = () => {
        setGenerating(true)
        axios.post("https://egnite-backend.herokuapp.com/generate", {})
            .then((res) => {
                setGenerating(false)
                setMessage("")
                console.log(res)
            })
            .catch((err) => {
                setGenerating(false)
                console.log(err)
            })
    }

    return (
        <Box width="300px" background={colorMode === "light" ? "white" : "gray.800"} className="git-background" height="calc(100vh - 1px)">
            <VStack spacing={2} align="left">
                <Box padding="20px 20px 10px 20px">
                    <Text color={colorMode === "light" ? "gray.600" : "gray.300"} fontWeight="700">SOURCE CODE</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="500">Sync your source code</Text>
                </Box>
                <VStack spacing={3} align="left" padding="8px 15px">
                    <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" variant="filled" size="md" height="120px" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                    <Button isLoading={generating} loadingText="Generating" onClick={handleGenerateCode} colorScheme="green" size="sm" width="100%">Generate & Commit</Button>
                </VStack>
                <Divider color="gray.500" />

                <VStack spacing={2} align="left" padding="5px 15px">
                    <Box>
                        <Text color="gray.500" fontWeight="500">Commits</Text>
                    </Box>
                </VStack>
            </VStack>
        </Box>
    )
}

export default GitSidebar

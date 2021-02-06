import { Box, HStack, IconButton, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BiEditAlt, BiFile, BiTrash } from 'react-icons/bi'

interface SchemaProps {
    name: string,
    description: string,
    fields: number,
    relations: number
}

const SchemaItem = ({ name, description, fields, relations }: SchemaProps) => {
    const { colorMode, } = useColorMode()

    return (
        <Box className="scale-animation" borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)" padding="10px 20px">
            <HStack justifyContent="space-between" padding="10px 0px">
                <HStack cursor="pointer">
                    <BiFile color="#718096" size="40" />
                    <Box>
                        <Text fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{name}</Text>
                        <Text fontSize="sm" fontWeight="500" color="gray.500">{description}</Text>
                    </Box>
                </HStack>
                <HStack>
                    <Box width="120px">
                        <Text textAlign="center" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{fields}</Text>
                        <Text textAlign="center" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Fields</Text>
                    </Box>
                    <Box width="120px">
                        <Text textAlign="center" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{relations}</Text>
                        <Text textAlign="center" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Relations</Text>
                    </Box>
                    <Box width="120px" textAlign="right" fontSize="md" color={colorMode === "light" ? "gray.800" : "gray.400"}>
                        <IconButton variant="ghost" aria-label="Delete" marginRight="1">
                            <BiEditAlt color="#718096" size="20" />
                        </IconButton>
                        <IconButton variant="ghost" aria-label="Delete">
                            <BiTrash color="#718096" size="20" />
                        </IconButton>
                    </Box>
                </HStack>
            </HStack>

        </Box>
    )
}

export default SchemaItem

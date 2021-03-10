import { Box, HStack, Text, useColorMode } from '@chakra-ui/react'

import React from 'react'
import { BiFile } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'

import DeleteSchema from './DeleteSchema'
import UpdateSchema from './UpdateSchema'

interface SchemaProps {
    id: string,
    name: string,
    description: string,
    fields: number,
    relations: number
}

const SchemaItem = ({ id, name, description, fields, relations }: SchemaProps) => {
    const { colorMode, } = useColorMode()
    const history = useHistory()
    return (
        <Box className="scale-animation" borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)" padding="10px 20px">
            <HStack justifyContent="space-between" padding="10px 0px">
                <HStack onClick={() => history.push(`/schemas/${id}`)} cursor="pointer">
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
                        <UpdateSchema id={id} name={name} description={description} />
                        <DeleteSchema id={id}/>
                    </Box>
                </HStack>
            </HStack>

        </Box>
    )
}

export default SchemaItem

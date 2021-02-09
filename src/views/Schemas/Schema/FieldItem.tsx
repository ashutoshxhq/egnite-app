import { Box, HStack, Text, useColorMode } from '@chakra-ui/react'

import React from 'react'
import { BiFile } from 'react-icons/bi'
import DeleteField from './DeleteField'
import UpdateField from './UpdateField'

interface FieldProps {
    id: string,
    name: string,
    type: string,
    defaultValue: string,
    nullType: string,
    unique: boolean,
    relations?: number,
    refresh: () => void,
}

const FieldItem = ({ id, name, type, refresh, defaultValue, nullType, unique}: FieldProps) => {
    const { colorMode, } = useColorMode()

    return (
        <Box className="scale-animation" borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)" padding="10px 20px">
            <HStack justifyContent="space-between" padding="10px 0px">
                <HStack>
                    <BiFile color="#718096" size="40" />
                    <Box>
                        <Text fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{name}</Text>
                        <Text fontSize="sm" fontWeight="500" color="gray.500">Type: {type}{defaultValue === ""?null:", Default: "+defaultValue}  </Text>
                    </Box>
                </HStack>
                <HStack>
                    <Box>
                        <Text textAlign="right" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{nullType === "NULL"?"Null":"Not Null"}, {unique?"Unique":"Not Unique"}</Text>
                        <Text textAlign="right" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Properties</Text>
                    </Box>
                    <Box width="120px" textAlign="right" fontSize="md" color={colorMode === "light" ? "gray.800" : "gray.400"}>
                        <UpdateField refresh={refresh} id={id} name={name} type={type} default={defaultValue} null={nullType} unique={unique}  />
                        <DeleteField refresh={refresh} id={id} />
                    </Box>
                </HStack>
            </HStack>

        </Box>
    )
}

export default FieldItem

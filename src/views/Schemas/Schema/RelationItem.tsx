import { Box, HStack, Text, useColorMode } from '@chakra-ui/react'

import React from 'react'
import { BiFile } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import DeleteField from './DeleteField'
import UpdateField from './UpdateField'

interface RelationItemProps {
    id: string,
    name: string,
    from: string,
    to: string,
    relations?: number,
    refresh: ()=>void,
}

const RelationItem = ({ id, name, from, refresh, to }: RelationItemProps) => {
    const { colorMode, } = useColorMode()
    const history = useHistory()

    return (
        <Box className="scale-animation" borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)" padding="10px 20px">
            <HStack justifyContent="space-between" padding="10px 0px">
                <HStack onClick={() => history.push(`/schemas/${id}`)} cursor="pointer">
                    <BiFile color="#718096" size="40" />
                    <Box>
                        <Text fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{name}</Text>
                        <Text fontSize="sm" fontWeight="500" color="gray.500">Type: relation </Text>
                    </Box>
                </HStack>
                <HStack>

                    <Box>
                        <Text textAlign="right" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{"id -> "+ to }</Text>
                        <Text textAlign="right" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Relation</Text>
                    </Box>
                    
                    <Box width="120px" textAlign="right" fontSize="md" color={colorMode === "light" ? "gray.800" : "gray.400"}>
                        <UpdateField refresh={refresh} id={id} name={name} description={"relation"} />
                        <DeleteField refresh={refresh} id={id}/>
                    </Box>
                </HStack>
            </HStack>

        </Box>
    )
}

export default RelationItem

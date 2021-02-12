import { Box, HStack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BiFile } from 'react-icons/bi'
import DeleteRelation from './DeleteRelation'

interface RelationItemProps {
    id: string,
    name: string,
    from: string,
    to: string,
    relations?: number,
}

const RelationItem = ({ id, name, to, from }: RelationItemProps) => {
    const { colorMode, } = useColorMode()

    return (
        <Box className="scale-animation" borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)" padding="10px 20px">
            <HStack justifyContent="space-between" padding="10px 0px">
                <HStack>
                    <BiFile color="#718096" size="40" />
                    <Box>
                        <Text fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{name}</Text>
                        <Text fontSize="sm" fontWeight="500" color="gray.500">Type: relation </Text>
                    </Box>
                </HStack>
                <HStack>

                    <Box>
                        <Text textAlign="right" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>{ from +"-> "+ to }</Text>
                        <Text textAlign="right" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Relationship</Text>
                    </Box>
                    
                    <Box width="120px" textAlign="right" fontSize="md" color={colorMode === "light" ? "gray.800" : "gray.400"}>
                        {/* <UpdateField  id={id} name={name} description={"relation"} /> */}
                        <DeleteRelation id={id}/>
                    </Box>
                </HStack>
            </HStack>

        </Box>
    )
}

export default RelationItem

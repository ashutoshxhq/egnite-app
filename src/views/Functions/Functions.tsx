import { Box, Heading, HStack, Image, Text, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'

const Functions = () => {
    const { colorMode, } = useColorMode()
    const { serviceID } = useParams<any>();

    return (
        <Box width="100%">
            <VStack padding="20px">
                <HeadBreadcrumbs primary="Functions" primaryRoute={"/"+serviceID+"/functions"} secondary="Overview" secondaryRoute={"/"+serviceID+"/functions"} />
                <HStack justifyContent="space-between" width="100%">
                    <Box padding="20px">
                        <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Functions</Heading>
                        <Text fontSize="sm" color="gray.500">Write your custom logic here</Text>
                    </Box>
                    <Box padding="20px">
                        {/* <CreateSchema /> */}
                    </Box>
                </HStack>
                <Box width="100%" py="20" display="flex" justifyContent="center" opacity="0.1">
                    <Image src="/soon.svg" w="40%" h="100%"/>
                </Box>
            </VStack>
        </Box>
    )
}

export default Functions

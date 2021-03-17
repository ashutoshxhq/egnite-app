import { Box, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router';
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'

const Marketplace = () => {
    const { serviceID } = useParams<any>();
    const { colorMode, } = useColorMode()
    return (
        <Box width="100%">
            <VStack padding="20px">
                <HeadBreadcrumbs primary="Marketplace" primaryRoute={"/"+serviceID+"/marketplace"} secondary="Overview" secondaryRoute={"/"+serviceID+"/marketplace"} />
                <HStack justifyContent="space-between" width="100%">
                    <Box padding="20px">
                        <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Marketplace</Heading>
                        <Text fontSize="sm" color="gray.500">Ready to use apis for you</Text>
                    </Box>
                    <Box padding="20px">
                        {/* <CreateSchema /> */}
                    </Box>
                </HStack>
            </VStack>
        </Box>
    )
}

export default Marketplace

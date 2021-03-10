import { Box, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'

const Dashboard = () => {
    const { colorMode, } = useColorMode()
    return (
        <Box width="100%">
            <VStack padding="20px">
                <HeadBreadcrumbs primary="Dashboard" primaryRoute="/dashboard" secondary="Overview" secondaryRoute="/dashboard" />
                <HStack justifyContent="space-between" width="100%">
                    <Box padding="20px">
                        <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Dashboard</Heading>
                        <Text fontSize="sm" color="gray.500">Home for building apis</Text>
                    </Box>
                    <Box padding="20px">
                        {/* <CreateSchema /> */}
                    </Box>
                </HStack>
            </VStack>
        </Box>
    )
}

export default Dashboard

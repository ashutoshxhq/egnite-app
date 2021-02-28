import React from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'

const Account = () => {
    const { colorMode, } = useColorMode()
    return (
        <Box width="100%">
            <VStack  padding="20px">
                <HeadBreadcrumbs primary="Settings" primaryRoute="/settings" secondary="General" secondaryRoute="/settings" />
                <HStack justifyContent="space-between" width="100%">
                    <Box padding="20px">
                        <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Settings</Heading>
                        <Text fontSize="sm" color="gray.500">You can tweak and turn the knobs here</Text>
                    </Box>
                    <Box padding="20px">
                        {/* <CreateSchema /> */}
                    </Box>
                </HStack>
            </VStack>



        </Box>
    )
}

export default Account

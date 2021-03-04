import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { Route } from 'react-router-dom'
import GitSidebar from './GitSidebar'
import Sidebar from './Sidebar'

const AppLayoutRoute = ({ component: C, ...props }: any) => {
    return (
        <Route {...props}>
            <Box background={"gray.100"}>
                <HStack>
                    <Sidebar />
                    <Box width="calc(100% - 370px)" overflowY="scroll" padding="10px" height="100vh">
                        <C />
                    </Box>
                    <GitSidebar />
                </HStack>
            </Box >
        </Route>
    )
}

export default AppLayoutRoute

import { Box, HStack, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import GitSidebar from './GitSidebar'
import Sidebar from './Sidebar'

const AppLayoutRoute = ({ component: C, ...props }: any) => {
    const { colorMode } = useColorMode()
    return (
        <Route {...props}>
          {localStorage.getItem('loginStatus') === 'true' ?   <Box background={colorMode === "light" ? "gray.100" : "gray.900"}>
                <HStack>
                    <Sidebar />
                    <Box width="calc(100% - 370px)" overflowY="scroll" padding="10px" height="100vh">
                        <C />
                    </Box>
                    <GitSidebar />
                </HStack>
            </Box > : <Redirect to="/login" />}
        </Route>
    )
}

export default AppLayoutRoute

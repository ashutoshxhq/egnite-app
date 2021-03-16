import { Box, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'


const DashboardLayoutRoute = ({ component: C, ...props }: any) => {
    const { colorMode } = useColorMode()
    return (
        <Route {...props}>
            {localStorage.getItem('loginStatus') === 'true' ? <Box background={colorMode === "light" ? "gray.100" : "gray.900"} width="100%" overflowY="scroll" height="calc(100vh - 1px)">
                <C />
            </Box> : <Redirect to="/login" />}
        </Route>
    )
}

export default DashboardLayoutRoute

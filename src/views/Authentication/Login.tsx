import React from 'react'
import {
    Box,
    VStack,
    Grid,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Heading,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "../../components/ColorModeSwitcher"

const Login = () => {
    return (
        <Box fontSize="xl">
            <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <VStack spacing={5}>
                    <Heading marginBottom="10px">Login</Heading>
                    <FormControl id="email" width="300px">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="email" />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl id="email" width="300px">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" />
                        <FormHelperText>8 Characters Alphanumeric</FormHelperText>
                    </FormControl>
                    <Box textAlign="right" width="300px">
                        <Button colorScheme="blue" width="100%">Login</Button>
                    </Box>
                </VStack>
            </Grid>
        </Box>
    )
}

export default Login

import { Avatar, Box, ButtonGroup, Flex, HStack, IconButton, Image, Stack, Text,Link as TextLink, Tooltip, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaGithub, FaLinkedin, FaMoon, FaSun, FaTwitter } from 'react-icons/fa'
import { Link, Redirect, Route } from 'react-router-dom'


const DashboardLayoutRoute = ({ component: C, ...props }: any) => {
    const { colorMode, } = useColorMode()
    const { toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)
    return (
        <Route {...props}>
            {localStorage.getItem('loginStatus') === 'true' ? <Box background={colorMode === "light" ? "gray.100" : "gray.900"} width="100%" overflowY="scroll" height="calc(100vh - 1px)">
            <Box width="100%" >
            <VStack padding="0px">
                <Box  background={colorMode === "light" ? "white" : "gray.800"} width="100%">
                    <Box paddingLeft="2rem" paddingRight="2rem" maxWidth="80rem" marginLeft="auto" display="flex" justifyContent="space-between" padding="1rem 1.5rem" marginRight="auto">
                        <TextLink to="/"><Image src="/egnite.svg" height="2.5rem"></Image></TextLink>
                        <Box display={{ base: "none", sm: "none", md: "flex" }} alignItems="center">
                            <HStack spacing="2rem">
                                <TextLink as={Link} to="/" fontWeight="600"  color="blue.500">Home</TextLink>
                                <TextLink href="#features" fontWeight="600" color={colorMode === "light" ? "gray.500" : "rgb(160, 174, 192)"}>Feedback</TextLink>

                            </HStack>
                        </Box>
                        <HStack spacing="2">
                            <Tooltip label="Color Mode" aria-label="Color Mode" placement="bottom" hasArrow >
                                <Box onClick={toggleColorMode} cursor="pointer" color="gray.500" display="flex" borderRadius="6px" justifyContent="center" alignItems="center" width="45px" height="45px">
                                    <SwitchIcon size="20" />
                                </Box>
                            </Tooltip>
                            <Box display={{ base: "none", sm: "none", md: "flex", }} borderRadius="6px">
                                <HStack spacing="2rem">
                                    <TextLink display="flex" alignItems="center" target="_blank" fontWeight="600" color="rgb(74, 85, 104)">
                                        <Avatar size="sm" name="Ashutosh Dubey" />
                                    </TextLink>
                                </HStack>
                            </Box>
                        </HStack>


                    </Box>
                </Box>
                <C />

            </VStack>
            <Box as="footer"  background={colorMode === "light" ? "white" : "gray.800"} borderTop="solid 1px #80808014" role="contentinfo" py="6">
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    maxW={{ base: 'xl', md: '7xl' }}
                    mx="auto"
                    px={{ base: '6', md: '8' }}
                    align="center"
                >
                    <a aria-current="page" aria-label="Back to Home page" href="/" rel="home">
                        <Image src="/egnite-logo.svg" h="6" iconColor="blue.600" />
                    </a>
                    <Stack
                        my={{ base: '6', md: 0 }}
                        direction={{ base: 'column', md: 'row' }}
                        marginStart={{ md: '8' }}
                        fontSize="sm"
                        spacing={{ base: '2', md: '8' }}
                        textAlign={{ base: 'center', md: 'start' }}
                    >
                        <Text>&copy; {new Date().getFullYear()} Egnite Technology</Text>
                        <TextLink>Privacy</TextLink>
                        <TextLink>Terms and Conditions</TextLink>
                    </Stack>
                    <ButtonGroup marginStart={{ md: 'auto' }} color="gray.600" variant="ghost">
                        <IconButton as="a" href="https://www.linkedin.com/company/egnite-dev" target="_blank" aria-label="LinkedIn" icon={<FaLinkedin />} />
                        <IconButton as="a" href="https://github.com/egnite-dev" target="_blank" aria-label="Github" icon={<FaGithub />} />
                        <IconButton as="a" href="https://twitter.com/egnitedev" target="_blank" aria-label="Twitter" icon={<FaTwitter />} />
                    </ButtonGroup>
                </Flex>
            </Box>
        </Box>
               
            </Box> : <Redirect to="/login" />}
        </Route>
    )
}

export default DashboardLayoutRoute

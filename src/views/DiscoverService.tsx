import { Avatar } from '@chakra-ui/avatar'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image'
import { Box, Heading, HStack, Text, VStack, Link, Stack, Flex } from '@chakra-ui/layout'
import { Modal } from '@chakra-ui/modal'
import { Tooltip } from '@chakra-ui/tooltip'
import axios from 'axios'
import React, { useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { FaGithub, FaLinkedin, FaMoon, FaSun, FaTwitter } from 'react-icons/fa'
import { useHistory } from 'react-router'
import { ColorModeSwitcher } from '../components/ColorModeSwitcher'
import HeadBreadcrumbs from '../components/HeadBreadcrumbs'

const DiscoverService = () => {
    const { colorMode, } = useColorMode()
    const history = useHistory()
    const { toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)
    useEffect(() => {
        axios.get("http://localhost:3210/ping")
            .then(response => {
                console.log(response)
                axios.get("http://localhost:3210/services")
                    .then(res => {
                        if (res.data.services.length === 0) {
                            history.replace("/create-service")
                        } else {
                            console.log(res.data.services[0].name)
                            localStorage.setItem("serviceID", res.data.services[0].ID)
                            history.replace("/schemas")
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [history])
    return (
        <Box width="100%">
            <VStack padding="0px">
                <Box backgroundColor="rgb(255, 255, 255)" width="100%" borderBottomWidth={1}>
                    <Box paddingLeft="2rem" paddingRight="2rem" maxWidth="80rem" marginLeft="auto" display="flex" justifyContent="space-between" padding="1rem 1.5rem" marginRight="auto">
                        <Link to="/"><Image src="/egnite.svg" height="2.5rem"></Image></Link>
                        <Box display={{ base: "none", sm: "none", md: "flex" }} alignItems="center">
                            <HStack spacing="2rem">
                                <Link fontWeight="600" color="blue.500">Home</Link>
                                <Link href="#features" fontWeight="600" color="rgb(74, 85, 104)">Feedback</Link>

                            </HStack>
                        </Box>
                        <HStack spacing="2">
                            <Tooltip label="Color Mode" aria-label="Color Mode" placement="right" hasArrow >
                                <Box onClick={toggleColorMode} cursor="pointer" color="gray.500" display="flex" borderRadius="6px" justifyContent="center" alignItems="center" width="45px" height="45px">
                                    <SwitchIcon size="20" />
                                </Box>
                            </Tooltip>
                            <Box display={{ base: "none", sm: "none", md: "flex", }} borderRadius="6px">
                                <HStack spacing="2rem">
                                    <Link display="flex" alignItems="center" target="_blank" fontWeight="600" color="rgb(74, 85, 104)">
                                        <Avatar width="45px" height="45px" name="Ashutosh Dubey" src="https://bit.ly/dan-abramov" />
                                    </Link>
                                </HStack>
                            </Box>
                        </HStack>


                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" width="100%" height="100vh">
                    <VStack maxWidth="80rem" width="100%">

                        <HStack justifyContent="space-between" width="100%">
                            <Box padding="20px">
                                <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Services</Heading>
                                <Text fontSize="sm" color="gray.500">Home for all your services</Text>
                            </Box>
                            <Box padding="20px">
                                <Button colorScheme="blue" size="md" isFullWidth={true}> <BiPlus size="20" /> Create New Service</Button>
                            </Box>
                        </HStack>
                        <Box display={"flex"} width="100%">
                            <Box width="300px" height="300px" backgroundColor="white" borderRadius="10px" padding="20px" mx={"20px"}>
                                <Text>Service 1</Text>
                            </Box>
                            <Box width="300px" height="300px" backgroundColor="white" borderRadius="10px" padding="20px" mx={"20px"}>
                                <Text>Service 2</Text>
                            </Box>
                        </Box>
                    </VStack>
                </Box>

            </VStack>
            <Box as="footer" backgroundColor="white" borderTop="solid 1px #80808014" role="contentinfo" py="6">
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
                        <Link>Privacy</Link>
                        <Link>Terms and Conditions</Link>
                    </Stack>
                    <ButtonGroup marginStart={{ md: 'auto' }} color="gray.600" variant="ghost">
                        <IconButton as="a" href="https://www.linkedin.com/company/egnite-dev" target="_blank" aria-label="LinkedIn" icon={<FaLinkedin />} />
                        <IconButton as="a" href="https://github.com/egnite-dev" target="_blank" aria-label="Github" icon={<FaGithub />} />
                        <IconButton as="a" href="https://twitter.com/egnitedev" target="_blank" aria-label="Twitter" icon={<FaTwitter />} />
                    </ButtonGroup>
                </Flex>
            </Box>
        </Box>

    )
}

export default DiscoverService

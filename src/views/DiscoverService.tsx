import { Avatar } from '@chakra-ui/avatar'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image'
import { Box, Heading, HStack, Text, VStack, Link as TextLink, Stack, Flex, Divider } from '@chakra-ui/layout'
import { Modal } from '@chakra-ui/modal'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'
import { Tooltip } from '@chakra-ui/tooltip'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiDotsHorizontalRounded, BiPlus } from 'react-icons/bi'
import { FaGithub, FaLinkedin, FaMoon, FaSun, FaTwitter } from 'react-icons/fa'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { ColorModeSwitcher } from '../components/ColorModeSwitcher'
import HeadBreadcrumbs from '../components/HeadBreadcrumbs'

const DiscoverService = () => {
    const { colorMode, } = useColorMode()
    const history = useHistory()
    const { toggleColorMode } = useColorMode()
    const [services, setServices] = useState([])
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)
    useEffect(() => {
        axios.get("https://egnite-backend.herokuapp.com/ping")
            .then(response => {
                console.log(response)
                axios.get("https://egnite-backend.herokuapp.com/services?user=" + localStorage.getItem("userID"), { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
                    .then(res => {
                        console.log(res)
                        setServices(res?.data?.services)
                        if (res.data.services.length === 0) {
                            history.replace("/create-service")
                        } else {
                            console.log(res.data.services[0].name)
                            localStorage.setItem("serviceID", res.data.services[0].ID)
                            // history.replace("/schemas")
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
        <Box display="flex" justifyContent="center" width="100%" minHeight="90vh">
            <VStack maxWidth="80rem" width="100%">

                <HStack justifyContent="space-between" width="100%">
                    <Box padding="20px">
                        <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Services</Heading>
                        <Text fontSize="sm" color="gray.500">Home for all your services</Text>
                    </Box>
                    <Box padding="20px">
                        <Button as={Link} to="/create-service" colorScheme="blue" size="md" isFullWidth={true}> <BiPlus size="20" /> Create New Service</Button>
                    </Box>
                </HStack>
                <Box display={"flex"} width="100%">
                    {services.map((service: any) => <Box background={colorMode === "light" ? "white" : "gray.800"} width="300px"  borderRadius="10px" mx={"20px"}>
                        <Box width="100%" display="flex" padding="20px" pb="8px" justifyContent="space-between" alignItems="center">
                            <Text fontWeight="600" fontSize="md">{service.name}</Text>
                            <IconButton aria-label="drop down" variant="ghost" icon={<BiDotsHorizontalRounded size="30" />}> </IconButton>
                        </Box>
                        <HStack spacing="4" display="flex" justifyContent="space-between" alignItems="center" width="100%" p="6" pt="2">
                            <Stat px={{ base: 4, sm: 6 }} py="5" width="50%" bg={colorMode === "light" ? 'white' : 'rgb(255 255 255 / 2%)'} rounded="lg">

                                <StatNumber fontSize="3xl" textAlign="center" fontWeight="medium" color={colorMode === "light" ? 'gray.900' : 'white'}>
                                    {service.Schemas.length}
                                </StatNumber>
                                <StatLabel fontWeight="medium" textAlign="center" isTruncated color={colorMode === "light" ? 'gray.500' : 'gray.400'}>
                                    Schemas
                                </StatLabel>
                            </Stat>
                            <Stat px={{ base: 4, sm: 6 }} py="5" width="50%" bg={colorMode === "light" ? 'white' : 'rgb(255 255 255 / 2%)'} rounded="lg">

                                <StatNumber fontSize="3xl" textAlign="center" fontWeight="medium" color={colorMode === "light" ? 'gray.900' : 'white'}>
                                {service?.Functions?.length === undefined ? 0: service?.Functions?.length}
                                </StatNumber>
                                <StatLabel fontWeight="medium" textAlign="center" isTruncated color={colorMode === "light" ? 'gray.500' : 'gray.400'}>
                                    Functions
                                </StatLabel>
                            </Stat>
                        </HStack>
                        <Divider />
                        <Box  display="flex" padding="20px" borderRadius="10px" >
                            <Box width="100%">
                                <Button as={Link} to={"/"+service.ID+"/schemas"} width="100%" backgroundColor={colorMode === "light" ? 'gray.100' : "rgb(255 255 255 / 2%)"}>Open Service</Button>
                            </Box>
                            {/* <HStack justify="flex-end">
                                <Avatar size="sm" name="Ashutosh Dubey" />
                            </HStack> */}
                        </Box>

                    </Box>)}


                </Box>
            </VStack>
        </Box>

    )
}

export default DiscoverService

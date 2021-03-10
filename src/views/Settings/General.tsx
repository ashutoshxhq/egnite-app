import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, FormControl, FormLabel, Heading, HStack, Input, Select, Text, useColorMode, useToast, VStack } from '@chakra-ui/react'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'
import { BiEditAlt } from 'react-icons/bi'
import axios from 'axios'

const General = () => {
    const { colorMode, } = useColorMode()
    const [name, setName] = useState("")
    const [database, setDatabase] = useState("")
    const [loading, setLoading] = useState(false)
    const [databaseURI, setDatabaseURI] = useState("")
    const [, setService] = useState({})
    const toast = useToast()

    useEffect(() => {
        axios.get("http://localhost:3210/services/" + localStorage.getItem("ServiceID"))
            .then((res: any) => {
                console.log(res)
                setService(res?.data?.service);
                setName(res?.data?.service.name)
                setDatabase(res?.data?.service.DatabaseType)
                setDatabaseURI(res?.data?.service.DatabaseURI)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setService])

    const handleRefreshService = () => {
        axios.get("http://localhost:3210/services/" + localStorage.getItem("ServiceID"))
            .then((res: any) => {
                console.log(res)
                setService(res?.data?.service);
                setName(res?.data?.service.name)
                setDatabase(res?.data?.service.DatabaseType)
                setDatabaseURI(res?.data?.service.DatabaseURI)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdateService = () => {
        setLoading(true)
        axios.put("http://localhost:3210/services/" + localStorage.getItem("ServiceID"), { name, DatabaseType: database, DatabaseURI: databaseURI })
            .then((res: any) => {
                setTimeout(() => { setLoading(false) }, 300)

                handleRefreshService()
                toast({
                    title: "Service Updated.",
                    description: "Yay! service successfully updated",
                    position: "bottom-right",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)

            });
    }

    return (
        <Box width="100%">
            <VStack padding="20px">
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
                <Box borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)">
                    <VStack align="flex-start" justify="space-between" spacing="0" px="6" py="4">
                        <Text as="h3" fontWeight="bold" fontSize="lg">
                            Service Settings
                        </Text>
                        <Text color="gray.500" fontSize="sm">
                            Manage service details here
                        </Text>

                    </VStack>
                    <Divider />
                    <HStack>
                        <Box width="50%" px="6" py="4" pb="8">
                            <VStack justifyContent="flex-start" alignItems="flex-start" spacing={6}>
                                <FormControl>
                                    <FormLabel>Service Name:</FormLabel>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Database:</FormLabel>
                                    <Select placeholder="Select Field Type" value={database} onChange={(e) => setDatabase(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"}>
                                        <option value="postgresql">PostgreSQL</option>
                                        <option value="mysql">MYSQL</option>

                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Database URI:</FormLabel>
                                    <Input value={databaseURI} onChange={(e) => setDatabaseURI(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                </FormControl>
                                <Button size="md" mt={4} isLoading={loading} loadingText="Updating Service" onClick={handleUpdateService} colorScheme="blue">
                                    <BiEditAlt size="20" />  <Text marginLeft="1">Update Service</Text>
                                </Button>

                            </VStack>
                        </Box>
                        <Box width="50%">

                        </Box>
                    </HStack>


                </Box>
            </VStack>



        </Box>
    )
}

export default General

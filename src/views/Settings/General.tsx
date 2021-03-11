import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, FormControl, FormLabel, Heading, HStack, Input, Select, Text, useColorMode, useToast, VStack } from '@chakra-ui/react'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'
import { BiPlus, BiSave } from 'react-icons/bi'
import axios from 'axios'

const General = () => {
    const { colorMode, } = useColorMode()
    const [name, setName] = useState("")
    const [database, setDatabase] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingDatabase, setLoadingDatabase] = useState(false)
    const [loadingEnv, setLoadingEnv] = useState(false)
    const [databaseHost, setDatabaseHost] = React.useState("")
    const [databasePort, setDatabasePort] = React.useState("")
    const [databaseUser, setDatabaseUser] = React.useState("")
    const [databasePassword, setDatabasePassword] = React.useState("")
    const [databaseName, setDatabaseName] = React.useState("")
    const [, setService] = useState({})
    const toast = useToast()

    useEffect(() => {
        axios.get("http://localhost:3210/services/" + localStorage.getItem("serviceID"))
            .then((res: any) => {
                console.log(res)
                setService(res?.data?.service);
                setName(res?.data?.service.name)
                setDatabase(res?.data?.service.DatabaseType)
                setDatabaseHost(res?.data?.service.DatabaseHost)
                setDatabasePort(res?.data?.service.DatabasePORT)
                setDatabaseUser(res?.data?.service.DatabaseUser)
                setDatabasePassword(res?.data?.service.DatabaseUserPassword)
                setDatabaseName(res?.data?.service.DatabaseName)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setService])

    const handleRefreshService = () => {
        axios.get("http://localhost:3210/services/" + localStorage.getItem("serviceID"))
            .then((res: any) => {
                console.log(res)
                setService(res?.data?.service);
                setName(res?.data?.service.name)
                setDatabase(res?.data?.service.DatabaseType)
                setDatabaseHost(res?.data?.service.DatabaseHost)
                setDatabasePort(res?.data?.service.DatabasePORT)
                setDatabaseUser(res?.data?.service.DatabaseUser)
                setDatabasePassword(res?.data?.service.DatabaseUserPassword)
                setDatabaseName(res?.data?.service.DatabaseName)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdateDatabase = () => {
        setLoadingDatabase(true)
        axios.put("http://localhost:3210/services/" + localStorage.getItem("serviceID"), { name, DatabaseType: database, DatabaseName: databaseName, DatabaseHost: databaseHost, DatabasePORT: databasePort, DatabaseUser: databaseUser, DatabaseUserPassword: databasePassword })
            .then(response => {
                console.log(response)
                setTimeout(() => { setLoadingDatabase(false) }, 300)

                
                toast({
                    title: "Database Updated.",
                    description: "Yay! database creds successfully updated",
                    position: "bottom-right",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch(error => {
                setLoadingDatabase(false)
                console.log(error)
                toast({
                    title: "Error Updating.",
                    description: "Something went wrong updating database creds",
                    position: "bottom-right",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            })
    }

    const handleUpdateService = () => {
        setLoading(true)
        axios.put("http://localhost:3210/services/" + localStorage.getItem("serviceID"), { name})
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
                <VStack width="100%" spacing="8"  >
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
                            <Box width="100%" px="6" py="4" pb="8">
                                <VStack justifyContent="flex-start" alignItems="flex-start" spacing={6}>
                                    <Box width="60%" >
                                        <FormControl>
                                            <FormLabel>Service Name</FormLabel>
                                            <Input value={name} onChange={(e) => setName(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                        </FormControl>
                                    </Box>

                                    <Button size="md" mt={4} isLoading={loading} loadingText="Updating Service" onClick={handleUpdateService} colorScheme="blue">
                                        <BiSave size="20" />   <Text marginLeft="1">Save Service</Text>
                                    </Button>

                                </VStack>
                            </Box>

                        </HStack>


                    </Box>
                    <Box borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)">
                        <HStack justify="space-between">
                            <VStack align="flex-start" justify="space-between" spacing="0" px="6" py="4">
                                <Text as="h3" fontWeight="bold" fontSize="lg">
                                    Environment Variables
                                </Text>
                                <Text color="gray.500" fontSize="sm">
                                    Create and manage environment variables
                                </Text>
                            </VStack>
                            <Box px="6" py="4">

                                <Button size="md" mt={4} isLoading={loading} loadingText="Updating Service" onClick={() => { }}>
                                    <BiPlus size="20" />   <Text marginLeft="1">Add New Variable</Text>
                                </Button>
                            </Box>
                        </HStack>

                        <Divider />
                        <HStack>
                            <Box width="100%" px="6" py="4" pb="8">
                                <VStack justifyContent="flex-start" alignItems="flex-start" spacing={6}>
                                    <HStack width="100%" >
                                        <Box width="30%" >
                                            <FormControl>
                                                <FormLabel>Variable Name</FormLabel>
                                                <Input variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                            </FormControl>
                                        </Box>
                                        <Box width="50%" >
                                            <FormControl>
                                                <FormLabel>Value</FormLabel>
                                                <Input variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                            </FormControl>
                                        </Box>
                                    </HStack>

                                    <Button size="md" mt={4} isLoading={loadingEnv} loadingText="Updating Service" onClick={handleUpdateService} colorScheme="blue">
                                        <BiSave size="20" />  <Text marginLeft="1">Save Variables</Text>
                                    </Button>
                                </VStack>
                            </Box>

                        </HStack>


                    </Box>

                    <Box borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)">
                        <VStack align="flex-start" justify="space-between" spacing="0" px="6" py="4">
                            <Text as="h3" fontWeight="bold" fontSize="lg">
                                Database Settings
                        </Text>
                            <Text color="gray.500" fontSize="sm">
                                Manage database details here
                        </Text>

                        </VStack>
                        <Divider />
                        <HStack>
                            <Box width="100%" px="6" py="4" pb="8">
                                <VStack justifyContent="flex-start" alignItems="flex-start" spacing={6}>

                                    <Box width="60%" >
                                        <FormControl >
                                            <FormLabel>Database</FormLabel>
                                            <Select placeholder="Select Field Type" value={database} onChange={(e) => setDatabase(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"}>
                                                <option value="postgresql">PostgreSQL</option>
                                                <option value="mysql">MYSQL</option>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <HStack mt={4} spacing={10} width="100%">


                                        <FormControl width="60%">
                                            <FormLabel>Database Host</FormLabel>
                                            <Input value={databaseHost} onChange={(e) => setDatabaseHost(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                        </FormControl>

                                        <FormControl width="15%">
                                            <FormLabel>Port</FormLabel>
                                            <Input value={databasePort} onChange={(e) => setDatabasePort(e.target.value)} type="number" variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                        </FormControl>
                                    </HStack>
                                    <FormControl width="60%">
                                        <FormLabel>Database User</FormLabel>
                                        <Input value={databaseUser} onChange={(e) => setDatabaseUser(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                    </FormControl>
                                    <FormControl width="60%">
                                        <FormLabel>Database Password</FormLabel>
                                        <Input value={databasePassword} onChange={(e) => setDatabasePassword(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                    </FormControl>

                                    <Box width="60%" >

                                        <FormControl>
                                            <FormLabel>Database Name</FormLabel>
                                            <Input value={databaseName} onChange={(e) => setDatabaseName(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                        </FormControl>
                                    </Box>
                                    <Button size="md" mt={4} isLoading={loadingDatabase} loadingText="Updating Service" onClick={handleUpdateDatabase} colorScheme="blue">
                                        <BiSave size="20" />   <Text marginLeft="1">Save Database Creds</Text>
                                    </Button>

                                </VStack>
                            </Box>

                        </HStack>


                    </Box>
                </VStack>
            </VStack>



        </Box>
    )
}

export default General

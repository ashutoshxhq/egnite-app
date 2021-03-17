import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Stack,
    useColorMode,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import axios from 'axios'
import * as React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'


const CreateService = () => {
    const [database, setDatabase] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [databaseHost, setDatabaseHost] = React.useState("")
    const [databasePort, setDatabasePort] = React.useState("")
    const [databaseUser, setDatabaseUser] = React.useState("")
    const [databasePassword, setDatabasePassword] = React.useState("")
    const [databaseName, setDatabaseName] = React.useState("")
    const [name, setName] = React.useState("")

    const history = useHistory()
    const { colorMode, } = useColorMode()
    const handleCreateService = () => {
        setLoading(true)
        axios.post("https://egnite-backend.herokuapp.com/services", { name, UserID: localStorage.getItem("userID"), DatabaseType: database, DatabaseName: databaseName, DatabaseHost: databaseHost, DatabasePORT: databasePort, DatabaseUser: databaseUser, DatabaseUserPassword: databasePassword }, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
            .then(response => {
                console.log(response)
                setLoading(false)
                localStorage.setItem("serviceID", response.data.id)
                history.replace("/"+response.data.id+"/schemas")
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }

    return (

        <Box display="flex" justifyContent="center" width="100%" minHeight="90vh">
            <Box bg={mode("gray.100", "gray.900")} py="12" px={{ sm: '6', lg: '8' }}>
                <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>

                    <Heading mt="2" textAlign="center" size="xl" fontWeight="extrabold">
                        Create New Service
                </Heading>

                </Box>
                <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
                    <Box
                        bg={mode('white', 'gray.700')}
                        py="8"
                        px={{ base: '4', md: '10' }}
                        shadow="base"
                        rounded={{ sm: 'lg' }}
                    >
                        <Stack spacing="6">
                            <FormControl id="name">
                                <FormLabel>Service Name</FormLabel>
                                <Input value={name} onChange={e => setName(e.target.value)} type="text"  variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} required />
                            </FormControl>
                            <FormControl >
                                <FormLabel>Database</FormLabel>
                                <Select placeholder="Select Field Type"  variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} value={database} onChange={(e) => setDatabase(e.target.value)}>
                                    <option value="postgresql">PostgreSQL</option>
                                    <option value="mysql">MYSQL</option>

                                </Select>
                            </FormControl>
                            <HStack mt={4} spacing={4} width="100%">


                                <FormControl width="70%">
                                    <FormLabel>Database Host</FormLabel>
                                    <Input value={databaseHost}  variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} onChange={e => setDatabaseHost(e.target.value)} />
                                </FormControl>

                                <FormControl width="30%">
                                    <FormLabel>Port</FormLabel>
                                    <Input value={databasePort}  variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} onChange={e => setDatabasePort(e.target.value)} type="number" />
                                </FormControl>
                            </HStack>
                            <FormControl>
                                <FormLabel>Database User</FormLabel>
                                <Input value={databaseUser}  variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} onChange={e => setDatabaseUser(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Database Password</FormLabel>
                                <Input value={databasePassword}  variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} onChange={e => setDatabasePassword(e.target.value)} />
                            </FormControl>

                            <Box>

                                <FormControl>
                                    <FormLabel>Database Name</FormLabel>
                                    <Input value={databaseName}  variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} onChange={e => setDatabaseName(e.target.value)} />
                                </FormControl>
                            </Box>
                            <Box width="100%">
                            <Button onClick={handleCreateService}  width="100%" isLoading={loading} loadingText="Creating" type="submit" colorScheme="blue" size="lg" fontSize="md">
                                Create Service
                            </Button>
                            <Button as={Link} to="/" onClick={()=>{}} type="submit" marginTop="2" width="100%" size="lg" fontSize="md">
                                Go back
                            </Button>
                           
                            </Box>
                        </Stack>

                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default CreateService

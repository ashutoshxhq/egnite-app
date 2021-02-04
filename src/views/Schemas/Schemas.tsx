import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, Heading, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { BiEditAlt, BiFile, BiPlus, BiTrash } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Schemas = () => {
    const { colorMode, } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef<any>()
    return (
        <VStack padding="20px">
            <Box width="100%">
                <Breadcrumb color="gray.500">
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/">Egnite</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/schemas">Schemas</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color={colorMode === "light" ? "gray.700" : "gray.300"} as={Link} to="/schemas">Overview</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <HStack justifyContent="space-between" width="100%">
                <Box padding="20px">
                    <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Schemas</Heading>
                    <Text fontSize="sm" color="gray.500">This space is for management of all your schemas</Text>
                </Box>
                <Box padding="20px">
                    <Button onClick={onOpen} colorScheme="blue" size="md" isFullWidth={true}> <BiPlus size="20" /> Create New Schema</Button>
                    <Modal
                        
                        initialFocusRef={initialRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent background={colorMode==="light"?"white":"gray.800"}>
                            <ModalHeader>Create Schema</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Name:</FormLabel>
                                    <Input ref={initialRef} borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Description:</FormLabel>
                                    <Textarea borderColor={colorMode === "light" ? "gray.300" : "gray.600"} variant="outline" size="md" height="120px" />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" mr={3}>
                                <BiPlus size="20" />  Create Schema
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </HStack>
            {/* <Divider /> */}

            <Box borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)" padding="10px 20px">
                <HStack justifyContent="space-between" padding="10px 0px">
                    <HStack cursor="pointer">
                        <BiFile color="#718096" size="40" />
                        <Box>
                            <Text fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>Cadence</Text>
                            <Text fontSize="sm" fontWeight="500" color="gray.500">This is cadence model</Text>
                        </Box>
                    </HStack>

                    <HStack>
                        <Box width="120px">
                            <Text textAlign="center" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>10</Text>
                            <Text textAlign="center" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Fields</Text>
                        </Box>
                        <Box width="120px">
                            <Text textAlign="center" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>7</Text>
                            <Text textAlign="center" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Relations</Text>
                        </Box>
                        <Box width="120px" textAlign="right" fontSize="md" color={colorMode === "light" ? "gray.800" : "gray.400"}>
                            <IconButton variant="ghost" aria-label="Delete" marginRight="1">
                                <BiEditAlt color="#718096" size="20" />
                            </IconButton>
                            <IconButton variant="ghost" aria-label="Delete">
                                <BiTrash color="#718096" size="20" />
                            </IconButton>
                        </Box>
                    </HStack>
                </HStack>

            </Box>
            <Box borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)" padding="10px 20px">
                <HStack justifyContent="space-between" padding="10px 0px">
                    <HStack cursor="pointer">
                        <BiFile color="#718096" size="40" />
                        <Box>
                            <Text fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>Prospects</Text>
                            <Text fontSize="sm" fontWeight="500" color="gray.500">This is the prospect related fields</Text>
                        </Box>
                    </HStack>
                    <HStack>
                        <Box width="120px">
                            <Text textAlign="center" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>10</Text>
                            <Text textAlign="center" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Fields</Text>
                        </Box>
                        <Box width="120px">
                            <Text textAlign="center" fontSize="md" fontWeight="600" color={colorMode === "light" ? "gray.800" : "gray.400"}>7</Text>
                            <Text textAlign="center" fontSize="sm" fontWeight="600" color={colorMode === "light" ? "gray.500" : "gray.500"}>Relations</Text>
                        </Box>
                        <Box width="120px" textAlign="right" fontSize="md" color={colorMode === "light" ? "gray.800" : "gray.400"}>
                            <IconButton variant="ghost" aria-label="Delete" marginRight="1">
                                <BiEditAlt color="#718096" size="20" />
                            </IconButton>
                            <IconButton variant="ghost" aria-label="Delete">
                                <BiTrash color="#718096" size="20" />
                            </IconButton>
                        </Box>
                    </HStack>
                </HStack>

            </Box>
        </VStack>
    )
}

export default Schemas

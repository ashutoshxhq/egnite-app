import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useParams } from 'react-router'
import { useRecoilState } from 'recoil'
import { schemasAtom } from '../../store/schemas'

const CreateSchema = () => {
    const { colorMode, } = useColorMode()
    
    const { serviceID } = useParams<any>();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef<any>()
    const toast = useToast()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [, setSchemas] = useRecoilState(schemasAtom)

    const handleRefreshSchemas = () => {
        axios.get("https://egnite-backend.herokuapp.com/schemas?fetchRelations=true&service="+serviceID, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
            .then((res: any) => {
                setSchemas([...res?.data?.schemas]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleCreateSchema = () => {
        setLoading(true)
        axios.post("https://egnite-backend.herokuapp.com/schemas", { name, description,  ServiceID: serviceID, UserID: localStorage.getItem("userID")}, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
            .then((res: any) => {
                axios.post("https://egnite-backend.herokuapp.com/fields", { name: "ID", type: "uuid", default: "primarykey", null: "NOT_NULL", unique: true, schemaID: res.data.id }, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
                    .then((res: any) => {
                        handleRefreshSchemas()
                        setLoading(false)
                        onClose()
                        setDescription("")
                        setName("")
                        toast({
                            title: "Schema created.",
                            description: "Yay! you can start adding fields now",
                            position: "bottom-right",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                    })
                    .catch((err) => {
                        setLoading(false)
                        toast({
                            title: "An error occurred.",
                            description: "Unable to create ID field.",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                        console.log(err);
                    });
            })
            .catch((err) => {
                setLoading(false)
                toast({
                    title: "An error occurred.",
                    description: "Unable to create schema.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
                console.log(err);
            });
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme="blue" size="md" isFullWidth={true}> <BiPlus size="20" /> Create New Schema</Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Schema</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name:</FormLabel>
                            <Input ref={initialRef} value={name} onChange={(e) => setName(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description:</FormLabel>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} variant="filled" borderColor={colorMode === "light" ? "gray.300" : "gray.600"} size="md" height="120px" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={loading} loadingText="Creating" onClick={handleCreateSchema} colorScheme="blue" mr={3}>
                            <BiPlus size="20" />  <Text marginLeft="1">Create Schema</Text>
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateSchema

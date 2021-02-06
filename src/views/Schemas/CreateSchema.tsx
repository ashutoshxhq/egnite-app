import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorMode, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'

interface CreateSchemaProps {
    initialRef: any,
    isOpen: boolean,
    onClose: () => void,
}

const CreateSchema = ({ initialRef, isOpen, onClose }: CreateSchemaProps) => {
    const { colorMode, } = useColorMode()
    const toast = useToast()
    const history = useHistory()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const handleCreateSchema = () => {
        setLoading(true)
        axios.post("http://localhost:8080/schemas", { name, description })
            .then((res: any) => {
                setLoading(false)
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
                  onClose()
                history.push(`/schemas/${res.data.id}`);
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
        <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent background={colorMode === "light" ? "white" : "gray.800"}>
                <ModalHeader>Create Schema</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name:</FormLabel>
                        <Input ref={initialRef} value={name} onChange={(e) => setName(e.target.value)} borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description:</FormLabel>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} borderColor={colorMode === "light" ? "gray.300" : "gray.600"} variant="outline" size="md" height="120px" />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button isLoading={loading} loadingText="Creating" onClick={handleCreateSchema} colorScheme="blue" mr={3}>
                        <BiPlus size="20" />  Create Schema
                                </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateSchema

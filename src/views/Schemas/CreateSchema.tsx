import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BiPlus } from 'react-icons/bi'

interface CreateSchemaProps {
    initialRef: any,
    isOpen: boolean,
    onClose: () => void,
}

const CreateSchema = ({ initialRef, isOpen, onClose }: CreateSchemaProps) => {
    const { colorMode, } = useColorMode()
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
    )
}

export default CreateSchema

import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { schemasAtom } from '../../../store/schemas'

interface UpdateFieldProps {
    id: string,
    name: string,
    description: string,
    refresh: ()=>void
}

const UpdateField = ({ id, name: nameProp, description: descriptionProp, refresh }: UpdateFieldProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef<any>()
    const { colorMode, } = useColorMode()
    const toast = useToast()
    const [name, setName] = useState(nameProp)
    const [description, setDescription] = useState(descriptionProp)
    const [loading, setLoading] = useState(false)
    const [, setSchemas] = useRecoilState(schemasAtom)

    const handleRefreshSchemas = () => {
        axios.get("http://localhost:8080/schemas?fields=true")
            .then((res: any) => {
                setSchemas([...res?.data?.schemas]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleEditField = () => {
        setLoading(true)
        axios
            .put(`http://localhost:8080/fields/${id}`, { name, description })
            .then((res) => {
                console.log(res.data);
                handleRefreshSchemas()
                refresh()
                setLoading(false)
                onClose()
                toast({
                    title: "Schema updated.",
                    description: "Yay! your schema is now updated",
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
                    description: "Unable to update schema.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
                console.log(err);
            });
    };


    return (
        <>
            <IconButton onClick={onOpen} variant="ghost" aria-label="Delete" marginRight="1">
                <BiEditAlt color="#718096" size="20" />
            </IconButton>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent background={colorMode === "light" ? "white" : "gray.800"}>
                    <ModalHeader>Update Schema</ModalHeader>
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
                        <Button isLoading={loading} loadingText="Updating" onClick={handleEditField} colorScheme="blue" mr={3}>
                            <BiEditAlt size="20" />  <Text marginLeft="1">Update Schema</Text>
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateField

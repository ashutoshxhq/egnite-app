import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { useParams } from 'react-router'
import { useRecoilState } from 'recoil'
import { schemasAtom } from '../../store/schemas'

const DeleteSchema = ({ id }: { id: string }) => {
    const { serviceID } = useParams<any>();
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef<any>()
    const [, setSchemas] = useRecoilState(schemasAtom)
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleRefreshSchemas = () => {
        axios.get("https://egnite-backend.herokuapp.com/schemas?fetchRelations=true&service="+serviceID, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
            .then((res: any) => {
                setSchemas([...res?.data?.schemas]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDeleteSchema = () => {
        setLoading(true)
        axios.delete(`https://egnite-backend.herokuapp.com/schemas/${id}`, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
            .then((res) => {
                console.log(res.data);
                handleRefreshSchemas()
                setLoading(false)
                onClose()
                toast({
                    title: "Schema deleted.",
                    description: "Schema deleted successfully.",
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
                    description: "Unable to delete schema.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
                console.log(err);
            });
    }
    return (
        <>
            <IconButton onClick={() => setIsOpen(true)} variant="ghost" aria-label="Delete">
                <BiTrash color="#718096" size="20" />
            </IconButton>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Schema
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button isLoading={loading} loadingText={"Deleting"} colorScheme="red" onClick={handleDeleteSchema} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteSchema

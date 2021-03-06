import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { schemasAtom } from '../../../store/schemas'

const DeleteRelation = ({ id}: { id: string}) => {

    
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef<any>()
    const [, setSchemas] = useRecoilState(schemasAtom)
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleRefreshSchemas = () => {
        axios.get("http://localhost:3210/schemas?fetchRelations=true")
            .then((res: any) => {
                setSchemas([...res?.data?.schemas]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDeleteRelation = () => {
        setLoading(true)
        axios.delete(`http://localhost:3210/relations/${id}`)
            .then((res) => {
                handleRefreshSchemas()
                setLoading(false)
                onClose()
                toast({
                    title: "Relation deleted.",
                    description: "Relation deleted successfully.",
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
                    description: "Unable to delete relation.",
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
                            Delete Relation
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button isLoading={loading} loadingText={"Deleting"} colorScheme="red" onClick={handleDeleteRelation} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteRelation

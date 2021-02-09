import { Button, FormControl, FormLabel, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Switch, Text, useColorMode, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { BiEditAlt, BiPlus } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { schemasAtom } from '../../../store/schemas'

interface UpdateFieldProps {
    id: string,
    name: string,
    type: string,
    default: string,
    null: string,
    unique: boolean,
    refresh: ()=>void
}

const UpdateField = (props: UpdateFieldProps) => {
    const { schemaId } = useParams<any>();
    const { colorMode, } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef<any>()
    const toast = useToast()
    const [name, setName] = useState(props.name)
    const [type, setType] = useState(props.type)
    const [defaultValue, setDefaultValue] = useState(props.default === "value"?props.default:"")
    const [defaultType, setDefaultType] = useState(props.default !== "value"?props.default:"value")
    const [nullType, setNullType] = useState(props.null)
    const [unique, setUnique] = useState(props.unique)
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
    const handleUpdateField = () => {
        let dValue = "";
        if(defaultType === "value"){
            dValue = defaultValue;
        }
        else {
            dValue = defaultType;
        }
        setLoading(true)
        axios
            .put(`http://localhost:8080/fields/${props.id}`, { name, type, default: dValue, null: nullType, unique, SchemaID: schemaId})
            .then((res) => {
                console.log(res.data);
                handleRefreshSchemas()
                props.refresh()
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
                    <ModalHeader>Update Field / Relation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name:</FormLabel>
                            <Input ref={initialRef} value={name} onChange={(e) => setName(e.target.value)} borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Type:</FormLabel>
                            <Select placeholder="Select Field Type" value={type} onChange={(e) => setType(e.target.value)} borderColor={colorMode === "light" ? "gray.300" : "gray.600"}>
                                <option value="uuid">uuid</option>
                                <option value="relation">relation</option>
                                <option value="string">string</option>
                                <option value="int32">int32</option>
                                <option value="int64">int64</option>
                                <option value="uint32">uint32</option>
                                <option value="uint64">uint64</option>
                                <option value="float32">float32</option>
                                <option value="float64">float64</option>
                                <option value="boolean">boolean</option>
                                <option value="datetime">datetime</option>
                            </Select>
                        </FormControl>

                        {type === "relation" ? null :

                            <><FormControl mt={8}>
                                {/* <FormLabel>Properties:</FormLabel> */}
                                <HStack>
                                    <FormControl display="flex" flex="1" alignItems="center">
                                        <FormLabel htmlFor="email-alerts" mb="0">
                                            Unique Field ?
                                    </FormLabel>
                                        <Switch id="email-alerts" isChecked={unique} onChange={()=>setUnique(!unique)} />
                                    </FormControl>
                                    <RadioGroup display="flex" flex="1"  alignItems="center" onChange={(value) => setNullType(value.toString())} value={nullType}>
                                        <Stack direction="row">
                                            <Radio value="NULL">Null</Radio>
                                            <Radio value="NOT_NULL">Not Null</Radio>
                                        </Stack>
                                    </RadioGroup>

                                </HStack>

                            </FormControl>

                                <FormControl mt={8}>
                                    <FormLabel>Default:</FormLabel>
                                    <Select placeholder="Select Default Type" value={defaultType} onChange={(e) => setDefaultType(e.target.value)} borderColor={colorMode === "light" ? "gray.300" : "gray.600"}>
                                        {type === "uuid" ? <option value="generateRandomUUID">generateRandomUUID</option> : null}
                                        {type === "int32" || type === "int64" || type === "uint32" || type === "uint64" ? <option value="autoIncrement">autoIncrement</option> : null}
                                        {type === "boolean" ?
                                            <>
                                                <option value="true">true</option>
                                                <option value="false">false</option>
                                            </>
                                            : null}
                                        {type === "datetime" ? <option value="currentTime">currentTime</option> : null}
                                        <option value="value">value</option>
                                    </Select>
                                </FormControl>
                                {defaultType === "value" ?
                                    <FormControl mt={4}>
                                        <FormLabel>Default Value:</FormLabel>
                                        <Input value={defaultValue} onChange={(e) => setDefaultValue(e.target.value)} borderColor={colorMode === "light" ? "gray.300" : "gray.600"} />
                                    </FormControl>
                                    : null}</>
                        }

                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={loading} loadingText="Creating" onClick={handleUpdateField} colorScheme="blue" mr={3}>
                            <BiPlus size="20" />  <Text marginLeft="1">Update {type ==="relation"?"Relation":"Field"}</Text>
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateField

import { Box, Heading, HStack, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useColorMode, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiLink, BiPlus, BiToggleLeft } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import HeadBreadcrumbs from '../../../components/HeadBreadcrumbs'
import LoadingSkeleton from '../../../components/LoadingSkeleton'
import { schemasAtom } from '../../../store/schemas'
import CreateField from './CreateField'
import DeleteField from './DeleteField'
import DeleteRelation from './DeleteRelation'
import { MdTextFields } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import UpdateField from './UpdateField'
import { AiOutlineClockCircle, AiOutlineNumber } from "react-icons/ai";

interface SchemaData {
    ID: string,
    Name: string,
    Description: string,
    Fields: any[],
    Relations: any[]
}

const Schema = () => {
    const { colorMode, } = useColorMode()
    const { schemaId } = useParams<any>();
    const [schema, setSchema] = useState<SchemaData>()
    const [loading, setLoading] = useState(true)
    const [schemas, setSchemas] = useRecoilState(schemasAtom)
    console.log(schemas)
    useEffect(() => {
        setLoading(true);
        if (schemas.length === 0) {
            axios.get("http://localhost:8080/schemas?fetchRelations=true")
                .then((res: any) => {
                    setSchemas([...res?.data?.schemas]);
                    res?.data?.schemas.map((schema: any) => {
                        if (schema.ID === schemaId) {
                            setSchema({ ...schema })
                        }
                        return schema;
                    })
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        } else {
            schemas.map((schema: any) => {
                if (schema.ID === schemaId) {
                    setSchema({ ...schema })
                }
                setLoading(false);
                return schema;
            })
        }
    }, [schemas, schemaId, setSchemas, setSchema, setLoading])

    if (loading) return <LoadingSkeleton />

    return (
        <VStack padding="20px">
            <HeadBreadcrumbs primary="Schemas" primaryRoute="/schemas" secondary={schema!.Name} secondaryRoute={"/schemas/" + schema!.ID} />
            <HStack justifyContent="space-between" width="100%">
                <Box padding="20px">
                    <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">{schema!.Name} (Fields & Relations)</Heading>
                    <Text fontSize="sm" color="gray.500">{schema!.Description}</Text>
                </Box>
                <Box padding="20px">
                    <CreateField />
                </Box>
            </HStack>
            <VStack width="100%">
                <Box borderRadius="8px" background={colorMode === "light" ? "white" : "gray.800"} width="calc(100% - 40px)" padding="20px 0px">
                    <Table variant="simple">
                        <TableCaption>
                            <HStack justifyContent="center" width="100%">
                            <Box width="50%" cursor="pointer" borderRadius="6px" colorScheme="blue" margin="1rem" marginBottom="0rem" padding="0.2rem" backgroundColor={colorMode === "light" ? "gray.200" : "gray.700"}>
                                <HStack width="100%" justifyContent="center">
                                    <BiPlus size="20" />
                                    <Text className="text-table-caption" color={colorMode === "light" ? "gray.800" : "gray.400"} align="center">Add New Field or Relationship</Text>
                                </HStack>
                            </Box>
                            </HStack>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Field / Relation</Th>
                                <Th>Type</Th>
                                <Th isNumeric>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {schema?.Fields.map(field => <Tr  _hover={{backgroundColor:colorMode === "light" ? "gray.50" : "#2d374863"}}>
                                <Td>
                                    <HStack>
                                        <Box marginRight="10px" display="flex" justifyContent="center" alignItems="center" borderRadius="6px" width="40px" height="40px" backgroundColor={colorMode === "light" ? "gray.200" : "gray.700"}>
                                            {field.Type === "int32" || field.Type === "int64" || field.Type === "uint32" || field.Type === "uint64" ? <ImListNumbered size="25" /> : null}
                                            {field.Type === "uuid" ? <AiOutlineNumber size="25" /> : null}
                                            {field.Type === "string" ? <MdTextFields size="25" /> : null}
                                            {field.Type === "boolean" ? <BiToggleLeft size="25" /> : null}
                                            {field.Type === "datetime" ? <AiOutlineClockCircle size="25" /> : null}

                                        </Box>
                                        <Box>
                                            <Text fontSize="md" fontWeight="500" color={colorMode === "light" ? "gray.800" : "gray.400"}>{field.Name}</Text>
                                            <Text fontSize="sm" fontWeight="400" color="gray.500">{field.Null === "NULL" ? "null" : "not null"}, {field.Unique ? "unique" : "not unique"} {field.Default === "" ? null : ", Default: " + field.Default}  </Text>
                                        </Box>
                                    </HStack>

                                </Td>
                                <Td><Text fontSize="md" fontWeight="500" color={colorMode === "light" ? "gray.800" : "gray.400"}>{field.Type}</Text></Td>
                                <Td isNumeric>
                                    <UpdateField id={field.ID} name={field.Name} type={field.Type} default={field.Default} null={field.Null} unique={field.Unique} />
                                    <DeleteField id={field.ID} />
                                </Td>
                            </Tr>)}

                            {schema?.Relations.map(relation => <Tr backgroundColor={colorMode === "light" ? "#f7fafc75" : "#2d37482e"}  _hover={{backgroundColor:colorMode === "light" ? "gray.50" : "#2d374863"}}>
                                <Td>
                                    <HStack>
                                        <Box  marginRight="10px" display="flex" justifyContent="center" alignItems="center" borderRadius="6px" width="40px" height="40px" backgroundColor={colorMode === "light" ? "gray.200" : "gray.700"}>
                                            <BiLink size="25" />
                                        </Box>
                                        <Box>
                                            <Text fontSize="md" fontWeight="500" color={colorMode === "light" ? "gray.800" : "gray.400"}>{relation.Name}</Text>
                                            <Text fontSize="sm" fontWeight="400" color="gray.500"> {relation.FromField.Name + "-> " + relation.ToSchema.Name + "." + relation.ToField.Name} </Text>
                                        </Box>
                                    </HStack>
                                </Td>
                                <Td><Text fontSize="md" fontWeight="500" color={colorMode === "light" ? "gray.800" : "gray.400"}>relation</Text></Td>
                                <Td isNumeric>
                                     <UpdateField id={relation.ID} name={relation.Name} type={relation.Type} to={relation.ToFieldID} toSchema={relation.ToSchemaID} fromField={relation.FromFieldID}/>

                                    <DeleteRelation id={relation.ID} />
                                </Td>
                            </Tr>)}
                        </Tbody>

                    </Table>
                </Box>
                {/* {schema?.Fields.map(field => <FieldItem key={field.ID} defaultValue={field.Default} id={field.ID} name={field.Name} type={field.Type} nullType={field.Null} unique={field.Unique} refresh={() => console.log("Refresh fields")} />)}
                {schema?.Relations.map(relation => <RelationItem from={relation.FromField.Name} to={relation.ToSchema.Name + "." + relation.ToField.Name} id={relation.ID} name={relation.Name} />)} */}
            </VStack>
        </VStack>
    )
}

export default Schema

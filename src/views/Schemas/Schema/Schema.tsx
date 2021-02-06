import { Box, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HeadBreadcrumbs from '../../../components/HeadBreadcrumbs'
import LoadingSkeleton from '../../../components/LoadingSkeleton'
import CreateField from './CreateField'

interface SchemaData {
    ID: string,
    Name: string,
    Description: string,
    Fields: any[],
}

const Schema = () => {
    const { colorMode, } = useColorMode()
    const { schemaId } = useParams<any>();
    const [schema, setSchema] = useState<SchemaData>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8080/schemas/${schemaId}?fields=true`)
            .then((res) => {
                console.log("Data:", res.data)
                setSchema(res.data.schema)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [schemaId, setSchema, setLoading])

     if(loading) return <LoadingSkeleton/>

    return (
        <VStack padding="20px">
            <HeadBreadcrumbs primary="Schemas" primaryRoute="/schemas" secondary={schema!.Name} secondaryRoute={"/schemas/"+schema!.ID} />
            <HStack justifyContent="space-between" width="100%">
                <Box padding="20px">
                    <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">{schema!.Name} (Fields & Relations)</Heading>
                    <Text fontSize="sm" color="gray.500">{schema!.Description}</Text>
                </Box>
                <Box padding="20px">
                    <CreateField />
                </Box>
            </HStack>
        </VStack>
    )
}

export default Schema

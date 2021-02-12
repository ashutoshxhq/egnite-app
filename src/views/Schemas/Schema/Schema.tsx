import { Box, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import HeadBreadcrumbs from '../../../components/HeadBreadcrumbs'
import LoadingSkeleton from '../../../components/LoadingSkeleton'
import { schemasAtom } from '../../../store/schemas'
import CreateField from './CreateField'
import FieldItem from './FieldItem'
import RelationItem from './RelationItem'

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
            {schema?.Fields.map(field => <FieldItem key={field.ID} defaultValue={field.Default} id={field.ID} name={field.Name} type={field.Type} nullType={field.Null} unique={field.Unique} refresh={() => console.log("Refresh fields")} />)}
            {schema?.Relations.map(relation => <RelationItem from={relation.FromField.Name} to={relation.ToSchema.Name+"."+relation.ToField.Name} id={relation.ID} name={relation.Name} />)}
            
        </VStack>
    )
}

export default Schema

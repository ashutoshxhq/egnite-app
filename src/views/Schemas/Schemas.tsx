import { Box, CircularProgress, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useRecoilState } from 'recoil'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'
import { schemasAtom } from '../../store/schemas'
import CreateSchema from './CreateSchema'
import SchemaItem from './SchemaItem'

const Schemas = () => {
    const { colorMode, } = useColorMode()
    const { serviceID } = useParams<any>();
    const [schemas, setSchemas] = useRecoilState(schemasAtom)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("https://egnite-backend.herokuapp.com/schemas?fetchRelations=true&service="+serviceID, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
            .then((res: any) => {
                setSchemas([...res?.data?.schemas]);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            });
    }, [setSchemas])

    return (
        <VStack padding="20px">
            <HeadBreadcrumbs primary="Schemas" primaryRoute={`/${serviceID}/schemas`} secondary="Overview" secondaryRoute={`/${serviceID}/schemas`} />
            <HStack justifyContent="space-between" width="100%">
                <Box padding="20px">
                    <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Schemas</Heading>
                    <Text fontSize="sm" color="gray.500">This space is for management of all your schemas</Text>
                </Box>
                <Box padding="20px">
                    <CreateSchema />
                </Box>
            </HStack>
            <VStack width="100%">
            {loading? <Box display="flex" width="100%" justifyContent="center"> <CircularProgress  isIndeterminate color="blue.500" trackColor="grey.500"/></Box>
            : schemas.map(schema => <SchemaItem key={schema.ID} id={schema.ID} name={schema.Name} description={schema.Description} fields={schema?.Fields?.length} relations={schema?.Relations?.length} />)}
            </VStack>
        </VStack>
    )
}

export default Schemas

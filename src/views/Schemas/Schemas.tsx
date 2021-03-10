import { Box, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'
import { schemasAtom } from '../../store/schemas'
import CreateSchema from './CreateSchema'
import SchemaItem from './SchemaItem'

const Schemas = () => {
    const { colorMode, } = useColorMode()
    const [schemas, setSchemas] = useRecoilState(schemasAtom)
    useEffect(() => {
        axios.get("http://localhost:3210/schemas?fetchRelations=true")
            .then((res: any) => {
                setSchemas([...res?.data?.schemas]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setSchemas])

    return (
        <VStack padding="20px">
            <HeadBreadcrumbs primary="Schemas" primaryRoute={`/schemas`} secondary="Overview" secondaryRoute={`/schemas`} />
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
            {schemas.map(schema => <SchemaItem key={schema.ID} id={schema.ID} name={schema.Name} description={schema.Description} fields={schema?.Fields?.length} relations={schema?.Relations?.length} />)}
            </VStack>
        </VStack>
    )
}

export default Schemas

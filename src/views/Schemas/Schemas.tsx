import { Box, Button, Heading, HStack, Text, useColorMode, useDisclosure, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'
import { schemasAtom } from '../../store/schemas'
import CreateSchema from './CreateSchema'
import SchemaItem from './SchemaItem'
import UpdateSchema from './UpdateSchema'

const Schemas = () => {
    const { colorMode, } = useColorMode()
    const initialRef = React.useRef<any>()
    const [schemas, setSchemas] = useRecoilState(schemasAtom)

    useEffect(() => {
        axios.get("http://localhost:8080/schemas?fields=true")
            .then((res: any) => {
                setSchemas([...res?.data?.schemas]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setSchemas])
    return (
        <VStack padding="20px">
            <HeadBreadcrumbs primary="Schemas" primaryRoute="/schemas" secondary="Overview" secondaryRoute="/schemas" />
            {/* <UpdateSchema /> */}
            <HStack justifyContent="space-between" width="100%">
                <Box padding="20px">
                    <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Schemas</Heading>
                    <Text fontSize="sm" color="gray.500">This space is for management of all your schemas</Text>
                </Box>
                <Box padding="20px">
                    <CreateSchema />
                </Box>
            </HStack>
            {schemas.map(schema => <SchemaItem id={schema.ID} name={schema.Name} description={schema.Description} fields={schema?.Fields?.length} relations={0} />)}
        </VStack>
    )
}

export default Schemas

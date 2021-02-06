import { Box, Button, Heading, HStack, Text, useColorMode, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { BiPlus } from 'react-icons/bi'
import HeadBreadcrumbs from '../../components/HeadBreadcrumbs'
import CreateSchema from './CreateSchema'
import SchemaItem from './SchemaItem'

const Schemas = () => {
    const { colorMode, } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef<any>()
    return (
        <VStack padding="20px">
            <HeadBreadcrumbs primary="Schemas" primaryRoute="/schemas" secondary="Overview" secondaryRoute="/schemas" />
            <HStack justifyContent="space-between" width="100%">
                <Box padding="20px">
                    <Heading color={colorMode === "light" ? "gray.700" : "gray.200"} size="lg">Schemas</Heading>
                    <Text fontSize="sm" color="gray.500">This space is for management of all your schemas</Text>
                </Box>
                <Box padding="20px">
                    <Button onClick={onOpen} colorScheme="blue" size="md" isFullWidth={true}> <BiPlus size="20" /> Create New Schema</Button>
                    <CreateSchema isOpen={isOpen} initialRef={initialRef} onClose={onClose}  />
                </Box>
            </HStack>
            {/* <Divider /> */}
            <SchemaItem name="Prospects" description="this is prospects model" fields={5} relations={12} />
            <SchemaItem name="Cadences" description="this is cadences model" fields={9} relations={1} />
            <SchemaItem name="Users" description="this is users model" fields={25} relations={0} />

        </VStack>
    )
}

export default Schemas

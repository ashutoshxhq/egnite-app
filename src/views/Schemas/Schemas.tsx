import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Schemas = () => {
    return (
        <VStack>
            <Box width="100%">
                <Breadcrumb color="gray.500">
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/">Egnite</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/schemas">Schemas</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink  as={Link} to="/schemas">Overview</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
        </VStack>
    )
}

export default Schemas

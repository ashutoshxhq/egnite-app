import React from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

const Marketplace = () => {
    return (
        <Box width="100%">
            <Breadcrumb color="gray.500">
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">Egnite</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href="#">Marketplace</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">Overview</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Box>
    )
}

export default Marketplace

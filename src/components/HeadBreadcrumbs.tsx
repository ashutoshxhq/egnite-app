import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

interface HeadBreadcrumbsProps {
    primary: string,
    primaryRoute: string,
    secondary: string,
    secondaryRoute: string,
}

const HeadBreadcrumbs = ({primary, secondary, primaryRoute, secondaryRoute}:HeadBreadcrumbsProps) => {
    const { colorMode, } = useColorMode()

    return (
        <Box width="100%">
            <Breadcrumb color="gray.500">
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/">Egnite</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={primaryRoute}>{primary}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color={colorMode === "light" ? "gray.700" : "gray.300"} as={Link} to={secondaryRoute}>{secondary}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Box>
    )
}

export default HeadBreadcrumbs

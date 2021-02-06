import { Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const LoadingSkeleton = () => {
    return (
        <VStack padding="20px">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl"/>
        </VStack>
    )
}

export default LoadingSkeleton

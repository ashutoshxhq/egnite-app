import {
    Box,
    Heading,
    Image,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'

  import { LoginForm } from './LoginForm'

  export const Login = () => {
    return (
      <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
          <Box mb={{ base: '10', md: '28' }}>
            <Image mx="auto" h="10" src="/egnite.svg" />
          </Box>
          <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
          </Heading>
          <Text mt="4" align="center" maxW="md" fontWeight="medium">
            <span>Don&apos;t have an account?</span>
            <Box
              as="a" href="https://dw4b516oom0.typeform.com/to/amFe8E8d" 
              marginStart="1"
              
              color={mode('blue.600', 'blue.200')}
              _hover={{ color: 'blue.600' }}
              display={{ base: 'block', sm: 'revert' }}
            >
              Apply for access
            </Box>
          </Text>
        </Box>
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
          <Box
            bg={mode('white', 'gray.700')}
            py="8"
            px={{ base: '4', md: '10' }}
            shadow="base"
            rounded={{ sm: 'lg' }}
          >
            <LoginForm />
            
          </Box>
        </Box>
      </Box>
    )
  }
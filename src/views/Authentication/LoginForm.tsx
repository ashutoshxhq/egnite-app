import { Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import * as React from 'react'
import { useHistory } from 'react-router'
import { PasswordField } from './PasswordField'

export const LoginForm = () => {
  const histroy = useHistory()
  const toast = useToast()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setLoading(true)
        console.log(email, password)
        axios.post("https://egnite-backend.herokuapp.com/login",{email, password})
        .then((response) => {
          console.log(response.data.accessToken)
          localStorage.setItem("accessToken", response.data.accessToken)
          localStorage.setItem("loginStatus", "true")
          localStorage.setItem("userID", response.data.user.ID)
          setLoading(false)
          histroy.replace("/")
          toast({
            title: "Login Successful",
            description: "Locked and loaded for you to build apis",
            position: "bottom-right",
            status: "success",
            duration: 9000,
            isClosable: true,
        })
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
          toast({
            title: "Login Failed",
            description: "Please check your credentials",
            position: "bottom-right",
            status: "error",
            duration: 9000,
            isClosable: true,
        })
        })
      }}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input value={email} onChange={e=>setEmail(e.target.value)}  name="email" type="email" autoComplete="email" required />
        </FormControl>
        <PasswordField value={password} onChange={e=>setPassword(e.target.value)}/>
        <Button isLoading={loading} loadingText="Logging In" type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </form>
  )
}

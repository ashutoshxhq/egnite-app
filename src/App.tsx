import * as React from "react"
import {
  Box,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react"
import { BrowserRouter} from "react-router-dom";

import Layout from "./Layout";

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
})


export const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ChakraProvider theme={theme}>
        <Box height={0} borderBottom="solid 1px" borderColor="#8080801f">
        </Box>
        <Layout/>
      </ChakraProvider>
    </BrowserRouter>
  )
}

import * as React from "react"
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react"
import { BrowserRouter} from "react-router-dom";

import Layout from "./Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Layout/>
      </ChakraProvider>
    </BrowserRouter>
  )
}

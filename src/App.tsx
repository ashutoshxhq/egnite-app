import * as React from "react"
import {
  ChakraProvider,
  extendTheme
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
        <Layout/>
      </ChakraProvider>
    </BrowserRouter>
  )
}

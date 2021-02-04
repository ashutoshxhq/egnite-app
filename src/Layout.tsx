import * as React from "react"
import {
  Box,
  HStack,
  useColorMode
} from "@chakra-ui/react"
import { Switch, Route, Redirect } from "react-router-dom";
import Functions from "./views/Functions/Functions";
import Marketplace from "./views/Marketplace/Marketplace";
import Account from "./views/Settings/Account";
import Sidebar from "./components/Sidebar";
import GitSidebar from "./components/GitSidebar";
import Schemas from "./views/Schemas/Schemas";
import SchemaDetails from "./views/Schemas/SchemaDetails";

const Layout = () => {
  const { colorMode } = useColorMode()

  return (
    <Box background={colorMode === "light" ? "gray.100" : "gray.900"}>
      <HStack>
        <Sidebar />
        <Box width="calc(100% - 370px)" padding="10px" height="100vh">
          <Switch>
            <Route path="/" exact><Redirect to="/schemas" /></Route>
            <Route path="/schemas" exact component={Schemas} />
            <Route path="/schemas/:schemaId" exact component={SchemaDetails} />
            <Route path="/functions" exact component={Functions} />
            <Route path="/marketplace" exact component={Marketplace} />
            <Route path="/settings" exact component={Account} />
          </Switch>
        </Box>
        <GitSidebar />
      </HStack>
    </Box >
  )
}

export default Layout

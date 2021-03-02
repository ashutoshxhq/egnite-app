import * as React from "react"
import {
  Box,
  HStack,
  useColorMode
} from "@chakra-ui/react"
import { Switch, Route, Redirect } from "react-router-dom";
import Functions from "./views/Functions/Functions";
import Marketplace from "./views/Marketplace/Marketplace";
import Sidebar from "./components/Sidebar";
import GitSidebar from "./components/GitSidebar";
import Schemas from "./views/Schemas/Schemas";
import Schema from "./views/Schemas/Schema/Schema";
import General from "./views/Settings/General";
import Dashboard from "./views/Dashboard/Dashboard";

const Layout = () => {
  const { colorMode } = useColorMode()

  return (
    <Box background={colorMode === "light" ? "gray.100" : "gray.900"}>
      <HStack>
        <Sidebar />
        <Box width="calc(100% - 370px)" overflowY="scroll" padding="10px" height="100vh">
          <Switch>
            <Route path="/:serviceName/overview" exact component={Dashboard} />
            <Route path="/:serviceName/schemas" exact component={Schemas} />
            <Route path="/:serviceName/schemas/:schemaId" exact component={Schema} />
            <Route path="/:serviceName/functions" exact component={Functions} />
            <Route path="/:serviceName/marketplace" exact component={Marketplace} />
            <Route path="/:serviceName/settings" exact component={General} />
          </Switch>
        </Box>
        <GitSidebar />
      </HStack>
    </Box >
  )
}

export default Layout

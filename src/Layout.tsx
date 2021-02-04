import * as React from "react"
import {
  Box,
  HStack,
  useColorMode,
  VStack
} from "@chakra-ui/react"
import Models from "./views/Models/Models"
import { Switch, Route, Redirect } from "react-router-dom";
import Functions from "./views/Functions/Functions";
import Marketplace from "./views/Marketplace/Marketplace";
import Account from "./views/Settings/Account";
import Sidebar from "./components/Sidebar";
import GitSidebar from "./components/GitSidebar";

const Layout = () => {
  const { colorMode } = useColorMode()

    return (
        <Box background={colorMode === "light" ? "gray.100" : "gray.900"}>
          <HStack>
            <Sidebar />
            <Box width="calc(100% - 370px)" padding="10px" height="100vh">
              <VStack>
                <Switch>
                  <Route path="/" exact><Redirect to="/models" /></Route>
                  <Route path="/search" exact component={Models} />
                  <Route path="/models" exact component={Models} />
                  <Route path="/functions" exact component={Functions} />
                  <Route path="/marketplace" exact component={Marketplace} />
                  <Route path="/settings" exact component={Account} />
                </Switch>
              </VStack>
            </Box>
            <GitSidebar />
          </HStack>
        </Box >
    )
}

export default Layout

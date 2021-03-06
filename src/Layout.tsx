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
import { Login } from "./views/Authentication/Login";
import AppLayoutRoute from "./components/AppLayoutRoute";

const Layout = () => {

  return (
    <Switch>
      <AppLayoutRoute path="/:serviceName/overview" exact component={Dashboard} />
      <AppLayoutRoute path="/:serviceName/schemas" exact component={Schemas} />
      <AppLayoutRoute path="/:serviceName/schemas/:schemaId" exact component={Schema} />
      <AppLayoutRoute path="/:serviceName/functions" exact component={Functions} />
      <AppLayoutRoute path="/:serviceName/marketplace" exact component={Marketplace} />
      <AppLayoutRoute path="/:serviceName/settings" exact component={General} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact><Redirect to="/login"/></Route>
    </Switch>
  )
}

export default Layout

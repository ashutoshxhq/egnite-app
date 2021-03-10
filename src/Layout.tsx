import * as React from "react"

import { Switch, Route } from "react-router-dom";
import Functions from "./views/Functions/Functions";
import Marketplace from "./views/Marketplace/Marketplace";
import Schemas from "./views/Schemas/Schemas";
import Schema from "./views/Schemas/Schema/Schema";
import General from "./views/Settings/General";
import Dashboard from "./views/Dashboard/Dashboard";
import { Login } from "./views/Authentication/Login";
import AppLayoutRoute from "./components/AppLayoutRoute";
import DashboardLayoutRoute from "./components/DashboardLayoutRoute";
import SettingsLayoutRoute from "./components/SettingsLayoutRoute";
import DiscoverService from "./views/DiscoverService";

const Layout = () => {

  return (
    <Switch>
      <DashboardLayoutRoute path="/" exact component={DiscoverService} />
      <DashboardLayoutRoute path="/dashboard" exact component={Dashboard} />
      <AppLayoutRoute path="/:serviceName/schemas" exact component={Schemas} />
      <AppLayoutRoute path="/:serviceName/schemas/:schemaId" exact component={Schema} />
      <AppLayoutRoute path="/:serviceName/functions" exact component={Functions} />
      <AppLayoutRoute path="/:serviceName/marketplace" exact component={Marketplace} />
      <SettingsLayoutRoute path="/:serviceName/settings" exact component={General} />
      <Route path="/login" exact component={Login} />
    </Switch>
  )
}

export default Layout

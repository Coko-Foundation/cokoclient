import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import Layout from '../ui/Layout'
import Root from '../ui/UIDocs'
import NavigationBar from '../ui/NavigationBar'

const Global = createGlobalStyle`
  html {
    height: 100%;
  }
`

const Routes = (
  <Layout>
    <NavigationBar />
    <Switch>
      <Route component={Root} exact path="/" />
    </Switch>
  </Layout>
)

export default Routes

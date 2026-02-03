import React from 'react'
import { Route, Routes } from 'react-router'
import { createGlobalStyle } from 'styled-components'

import Layout from '../ui/Layout'
import Root from '../ui/UIDocs'
import NavigationBar from '../ui/NavigationBar'

const Global = createGlobalStyle`
  html {
    height: 100%;
  }
`

const RoutesDeclared = (
  <Layout>
    <NavigationBar />
    <Routes>
      <Route element={<Root />} path="/" />
    </Routes>
  </Layout>
)

export default RoutesDeclared

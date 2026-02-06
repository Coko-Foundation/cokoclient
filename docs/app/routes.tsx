import { Route, Routes } from 'react-router'

import Layout from '../ui/Layout'
import Root from '../ui/UIDocs'
import NavigationBar from '../ui/NavigationBar'

const RoutesDeclared = (
  <Layout>
    <NavigationBar />
    <Routes>
      <Route element={<Root />} path="/" />
    </Routes>
  </Layout>
)

export default RoutesDeclared

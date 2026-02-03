import { Route, Routes } from 'react-router'

import { PageLayout, RequireAuth } from '../../../src'

import { ProviderConnectionPage } from '../../../src/pages'

import {
  NavigationBar,
  Root,
  ImageDemo,
  AntDemo,
  Profile,
  Protected,
  Teams,
  SubscriptionsTest,
} from './pages'

const RoutesDeclared = (
  <PageLayout fadeInPages navComponent={NavigationBar} padPages>
    <Routes>
      <Route element={<Root />} path="/" />
      <Route element={<ImageDemo />} path="/imagedemo" />
      <Route element={<AntDemo />} path="/ant" />
      <Route element={<Teams />} path="/teams" />

      <Route
        element={
          <RequireAuth
            notAuthenticatedRedirectTo="/"
            requireIdentityVerification={false}
          >
            <Protected />
          </RequireAuth>
        }
        path="/protected"
      />

      <Route
        element={
          <RequireAuth
            notAuthenticatedRedirectTo="/"
            requireIdentityVerification={false}
          >
            <Profile />
          </RequireAuth>
        }
        path="/profile"
      />

      <Route
        element={<ProviderConnectionPage closeOnSuccess />}
        path="/provider-connection-popup/:provider"
      />

      <Route
        element={
          <RequireAuth>
            <SubscriptionsTest />
          </RequireAuth>
        }
        path="/subscriptions-test"
      />
    </Routes>
  </PageLayout>
)

export default RoutesDeclared

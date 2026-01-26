import './sentry'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserHistory } from 'history'

import Root from '../components/Root'

const history = createBrowserHistory()
const rootEl = document.getElementById('root')

const startClient = (routes, theme, options = {}) => {
  const { makeApolloConfig } = options
  const root = createRoot(rootEl)

  root.render(
    <Root
      history={history}
      makeApolloConfig={makeApolloConfig}
      routes={routes}
      theme={theme}
    />,
  )
}

export default startClient

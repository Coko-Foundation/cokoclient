import './sentry'

import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { DefaultTheme } from 'styled-components'
import { DocumentNode } from '@apollo/client'
import type { AppProps } from 'antd'

import Root from '../components/Root'
import type { MakeApolloConfigFn } from './makeApolloClient'

type StartClientOptions = {
  makeApolloConfig?: MakeApolloConfigFn
  currentUserQuery?: DocumentNode
  onLogout?: () => void
  notification?: AppProps['notification']
}

const rootEl = document.getElementById('root')

const startClient = (
  routes: ReactNode,
  theme: DefaultTheme,
  options: StartClientOptions = {},
): void => {
  const { makeApolloConfig, currentUserQuery, onLogout, notification } = options

  if (!rootEl) {
    throw new Error('Root element not found')
  }

  const root = createRoot(rootEl)

  root.render(
    <Root
      currentUserQuery={currentUserQuery}
      makeApolloConfig={makeApolloConfig}
      notification={notification}
      onLogout={onLogout}
      routes={routes}
      theme={theme}
    />,
  )
}

export default startClient

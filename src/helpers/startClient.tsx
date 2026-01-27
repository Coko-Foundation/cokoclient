import './sentry'

import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { DefaultTheme } from 'styled-components'

import Root from '../components/Root'

type MakeApolloConfigFn = () => Record<string, unknown>

type StartClientOptions = {
  makeApolloConfig?: MakeApolloConfigFn
}

const rootEl = document.getElementById('root')

const startClient = (
  routes: ReactNode,
  theme: DefaultTheme,
  options: StartClientOptions = {},
): void => {
  const { makeApolloConfig } = options

  if (!rootEl) {
    throw new Error('Root element not found')
  }

  const root = createRoot(rootEl)

  root.render(
    <Root makeApolloConfig={makeApolloConfig} routes={routes} theme={theme} />,
  )
}

export default startClient

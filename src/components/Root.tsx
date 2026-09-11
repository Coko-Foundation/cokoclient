import { ReactNode, useMemo } from 'react'
import { BrowserRouter } from 'react-router'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { DocumentNode } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import type { AppProps } from 'antd'

import { noop } from '../toolkit/funcs'
import { CurrentUserQueryContext } from '../helpers/useCurrentUser'
import { SubscriptionManagerProvider } from '../helpers/subscriptionManagerContext'
import AntConfigProvider from './AntConfigProvider'
import {
  type MakeApolloConfigFn,
  makeApolloClient,
} from '../helpers/makeApolloClient'
import GlobalStyle from './GlobalStyle'

if (process.env.NODE_ENV !== 'production') {
  loadDevMessages()
  loadErrorMessages()
}

type RootProps = {
  currentUserQuery?: DocumentNode
  makeApolloConfig?: MakeApolloConfigFn
  routes: ReactNode
  theme: DefaultTheme
  onLogout?: () => void
  notification?: AppProps['notification']
}

const Root = ({
  currentUserQuery,
  onLogout = noop,
  makeApolloConfig,
  routes,
  theme,
  notification,
}: RootProps): ReactNode => {
  const client = useMemo(
    () => makeApolloClient(makeApolloConfig),
    [makeApolloConfig],
  )

  return (
    <ApolloProvider client={client}>
      <SubscriptionManagerProvider>
        <BrowserRouter>
          <CurrentUserQueryContext.Provider
            value={{ currentUserQuery, onLogout }}
          >
            <AntConfigProvider notification={notification} theme={theme}>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                {routes}
              </ThemeProvider>
            </AntConfigProvider>
          </CurrentUserQueryContext.Provider>
        </BrowserRouter>
      </SubscriptionManagerProvider>
    </ApolloProvider>
  )
}

export default Root

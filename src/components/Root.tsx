import React, { ReactNode, useMemo, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider as AntConfigProvider } from 'antd'
import { DefaultTheme, ThemeProvider, createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { setContext } from '@apollo/client/link/context'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { createClient } from 'graphql-ws'

import { CurrentUserContext } from '../helpers/currentUserContext'
import { SubscriptionManagerProvider } from '../helpers/subscriptionManagerContext'
// import AuthWrapper from './AuthWrapper'
import { serverUrl } from '../helpers/getUrl'

if (process.env.NODE_ENV !== 'production') {
  loadDevMessages()
  loadErrorMessages()
}

const replaceHttpWithWs = (url: string | undefined): string | null => {
  if (!url) return null
  let wsUrl = url.replace(/^http:/, 'ws:')
  wsUrl = wsUrl.replace(/^https:/, 'wss:')
  return wsUrl
}

const pxToNumConverter = (value: string | number | undefined): number | undefined => {
  if (typeof value === 'string') {
    if (value.slice(-2) === 'px') return parseInt(value.slice(0, -2), 10)
  }

  return typeof value === 'number' ? value : undefined
}

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colorBackground};
    color: ${props => props.theme.colorText};
    font-family: ${props => props.theme.fontInterface}, sans-serif;
    font-size: ${props => props.theme.fontSizeBase};
    line-height: ${props => props.theme.lineHeightBase};

    * {
      box-sizing: border-box;
    }
  }
`

// See https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-465305186
export function stripTypenames<T extends Record<string, unknown>>(obj: T): T {
  Object.keys(obj).forEach(property => {
    const value = obj[property]
    if (
      value !== null &&
      typeof value === 'object' &&
      !(value instanceof File)
    ) {
      delete (obj as Record<string, unknown>).property
      const newData = stripTypenames(value as Record<string, unknown>)
      ;(obj as Record<string, unknown>)[property] = newData
    } else if (property === '__typename') {
      delete (obj as Record<string, unknown>)[property]
    }
  })
  return obj
}

type ApolloConfig = {
  link: ApolloLink
  cache: InMemoryCache
}

type MakeConfigFn = (config: ApolloConfig) => ApolloConfig

// Construct an ApolloClient. If a function is passed as the first argument,
// it will be called with the default client config as an argument, and should
// return the desired config.
const makeApolloClient = (makeConfig?: MakeConfigFn | null): ApolloClient<NormalizedCacheObject> => {
  const webSocketUrl = `${replaceHttpWithWs(serverUrl)}/subscriptions`

  const uploadLink = createUploadLink({
    uri: `${serverUrl}/graphql`,
    headers: { 'Apollo-Require-Preflight': 'true' },
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const removeTypename = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = stripTypenames(operation.variables)
    }

    return forward(operation)
  })

  const link = ApolloLink.from([removeTypename, authLink, uploadLink])

  const subscriptionsLogMessage = '[subscriptions-ws]'

  const wsLink = new GraphQLWsLink(
    createClient({
      url: webSocketUrl,
      retryAttempts: Infinity,
      connectionParams: {
        authToken: localStorage.getItem('token'),
      },
      shouldRetry: () => {
        /* eslint-disable-next-line no-console */
        console.log(`${subscriptionsLogMessage} Attempting to reconnect...`)
        return true
      },
      on: {
        connecting: () => {
          /* eslint-disable-next-line no-console */
          console.log(`${subscriptionsLogMessage} Connecting...`)
        },
        connected: socket => {
          /* eslint-disable-next-line no-console */
          console.log(`${subscriptionsLogMessage} Connected.`)
        },
        closed: event => {
          console.error(`${subscriptionsLogMessage} Disconnected:`, event)
        },
      },
    }),
  )

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    link,
  )

  const config = {
    link: splitLink,
    cache: new InMemoryCache(),
  }

  return new ApolloClient(makeConfig ? makeConfig(config) : config)
}

export function makeTheme(providedTheme: DefaultTheme): { token: Record<string, unknown> } {
  const mapper: Record<string, unknown> = {
    borderRadius: pxToNumConverter(providedTheme.borderRadius),
    colorBgBase: providedTheme.colorBackground,
    colorTextBase: providedTheme.colorText,
    fontFamily: providedTheme.fontInterface,
    fontSize: pxToNumConverter(providedTheme.fontSizeBase),
    fontSizeHeading1: pxToNumConverter(providedTheme.fontSizeHeading1),
    fontSizeHeading2: pxToNumConverter(providedTheme.fontSizeHeading2),
    fontSizeHeading3: pxToNumConverter(providedTheme.fontSizeHeading3),
    fontSizeHeading4: pxToNumConverter(providedTheme.fontSizeHeading4),
    fontSizeHeading5: pxToNumConverter(providedTheme.fontSizeHeading5),
    fontSizeHeading6: pxToNumConverter(providedTheme.fontSizeHeading6),
    lineType: providedTheme.borderStyle,
    lineWidth: pxToNumConverter(providedTheme.borderWidth),
    motionUnit: providedTheme.transitionDuration,
    sizeUnit: pxToNumConverter(providedTheme.gridUnit),
  }

  const filtered = Object.fromEntries(
    Object.entries(mapper).filter(([, v]) => !!v),
  )

  return {
    token: {
      ...providedTheme,
      ...filtered,
    },
  }
}

type RootProps = {
  makeApolloConfig?: MakeConfigFn | null
  routes: ReactNode
  theme: DefaultTheme
}

const Root = ({ makeApolloConfig = null, routes, theme }: RootProps): React.ReactNode => {
  const [currentUser, setCurrentUser] = useState<unknown>()

  const client = useMemo(
    () => makeApolloClient(makeApolloConfig),
    [currentUser],
  )

  const mappedAntTheme = makeTheme(theme)

  return (
    <ApolloProvider client={client}>
      <SubscriptionManagerProvider>
        <BrowserRouter>
          {/* TO DO -- check how to fix this linting error */}
          {}
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {/* <AuthWrapper> */}
            <AntConfigProvider theme={mappedAntTheme}>
              <ThemeProvider theme={theme}>
                <Normalize />
                <GlobalStyle />
                {routes}
              </ThemeProvider>
            </AntConfigProvider>
            {/* </AuthWrapper> */}
          </CurrentUserContext.Provider>
        </BrowserRouter>
      </SubscriptionManagerProvider>
    </ApolloProvider>
  )
}

export default Root

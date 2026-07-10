import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { SetContextLink } from '@apollo/client/link/context'
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs'
import { createClient } from 'graphql-ws'

import { serverUrl } from './getUrl'

type ApolloConfig = {
  link: ApolloLink
  cache: InMemoryCache
}

type MakeApolloConfigFn = (config: ApolloConfig) => ApolloConfig

const replaceHttpWithWs = (url: string | undefined | null): string | null => {
  if (!url) return null
  let wsUrl = url.replace(/^http:/, 'ws:')
  wsUrl = wsUrl.replace(/^https:/, 'wss:')
  return wsUrl
}

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

// Construct an ApolloClient. If a function is passed as the first argument,
// it will be called with the default client config as an argument, and should
// return the desired config.
const makeApolloClient = (
  makeConfig?: MakeApolloConfigFn | null,
): ApolloClient => {
  const webSocketUrl = `${replaceHttpWithWs(serverUrl)}/subscriptions`

  const uploadLink = new UploadHttpLink({
    uri: `${serverUrl}/graphql`,
    headers: { 'Apollo-Require-Preflight': 'true' },
  })

  const authLink = new SetContextLink(prevContext => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...prevContext.headers,
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
        connected: _socket => {
          /* eslint-disable-next-line no-console */
          console.log(`${subscriptionsLogMessage} Connected.`)
        },
        closed: event => {
          if (event instanceof CloseEvent && event.wasClean) {
            /* eslint-disable-next-line no-console */
            console.log(`${subscriptionsLogMessage} Disconnected:`, event)
          } else {
            console.error(
              `${subscriptionsLogMessage} Disconnected unexpectedly:`,
              event,
            )
          }
        },
      },
    }),
  )

  const splitLink = ApolloLink.split(
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

export type { MakeApolloConfigFn }
export { makeApolloClient }

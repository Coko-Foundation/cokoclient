import React from 'react'
import { gql } from '@apollo/client'
import {
  useQuery,
  useSubscription,
  useApolloClient,
} from '@apollo/client/react'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      displayName
      username
      teams {
        id
        role
        objectId
        global
        members(currentUserOnly: true) {
          id
          user {
            id
          }
          status
        }
      }
      isActive
      defaultIdentity {
        id
        isVerified
      }
      identities {
        id
        provider
        hasValidRefreshToken
      }
    }
  }
`

const USER_UPDATED_SUBSCRIPTION = gql`
  subscription OnUserUpdated($userId: ID!) {
    userUpdated(userId: $userId) {
      id
      displayName
      username
      teams {
        id
        role
        objectId
        global
        members(currentUserOnly: true) {
          id
          user {
            id
          }
          status
        }
      }
      isActive
      defaultIdentity {
        id
        isVerified
      }
      identities {
        id
        provider
        hasValidRefreshToken
      }
    }
  }
`

export const CurrentUserQueryContext = React.createContext({
  currentUserQuery: null,
  onLogout: () => {},
})

export const useCurrentUser = () => {
  const { currentUserQuery: provicdedCurrentUserQuery, onLogout } =
    React.useContext(CurrentUserQueryContext)

  const currentUserQuery = provicdedCurrentUserQuery || CURRENT_USER

  const client = useApolloClient()
  const { data, loading, error, refetch } = useQuery(currentUserQuery)
  const currentUser = data?.currentUser

  useSubscription(USER_UPDATED_SUBSCRIPTION, {
    skip: !currentUser,
    variables: { userId: currentUser?.id },
    onData: ({ data: subscriptionData }) => {
      const userUpdated = subscriptionData.data?.userUpdated
      if (!userUpdated) return

      client.cache.writeQuery({
        query: currentUserQuery,
        data: { currentUser: userUpdated },
      })
    },
  })

  const logout = (): void => {
    client.cache.reset()
    localStorage.removeItem('token')
    onLogout()
  }

  if (error) console.error(error)

  return { currentUser, error, loading, refetch, logout }
}

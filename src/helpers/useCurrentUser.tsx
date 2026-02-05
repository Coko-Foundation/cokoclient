import { createContext, useContext } from 'react'
import { gql, DocumentNode } from '@apollo/client'

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

type CurrentUserQueryContextType = {
  currentUserQuery: DocumentNode | undefined
  onLogout: () => void
}

export const CurrentUserQueryContext =
  createContext<CurrentUserQueryContextType>({
    currentUserQuery: undefined,
    onLogout: () => {},
  })

type User = {
  id: string
  displayName: string
  username: string
  teams: Array<{
    id: string
    role: string
    objectId: string
    global: boolean
    members: Array<{
      id: string
      user: { id: string }
      status: string
    }>
  }>
  isActive: boolean
  defaultIdentity: {
    id: string
    isVerified: boolean
  }
  identities: Array<{
    id: string
    provider: string
    hasValidRefreshToken: boolean
  }>
}

type CurrentUserQueryData = {
  currentUser: User | null
}

type UserUpdatedSubscriptionData = {
  userUpdated: User
}

type UseCurrentUserReturn = {
  currentUser: User | null | undefined
  error: Error | undefined
  loading: boolean
  refetch: () => Promise<unknown>
  logout: () => void
}

export const useCurrentUser = (): UseCurrentUserReturn => {
  const { currentUserQuery: provicdedCurrentUserQuery, onLogout } = useContext(
    CurrentUserQueryContext,
  )

  const currentUserQuery = provicdedCurrentUserQuery || CURRENT_USER

  const client = useApolloClient()
  const { data, loading, error, refetch } =
    useQuery<CurrentUserQueryData>(currentUserQuery)
  const currentUser = data?.currentUser

  useSubscription<UserUpdatedSubscriptionData>(USER_UPDATED_SUBSCRIPTION, {
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

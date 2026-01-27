import React, { ComponentType, ReactNode } from 'react'
import { DocumentNode, useQuery, useSubscription } from '@apollo/client'
import { useCurrentUser } from '../helpers/currentUserContext'
import {
  CURRENT_USER,
  USER_UPDATED_SUBSCRIPTION,
} from '../helpers/currentUserQuery'

import Spin from '../ui/common/Spin'

type LoadingComponentProps = {
  spinning: boolean
  children?: ReactNode
}

type AuthWrapperProps = {
  loadingComponent?: ComponentType<LoadingComponentProps>
  currentUserQuery?: DocumentNode
  children?: ReactNode
}

const AuthWrapper = ({
  loadingComponent: LoadingComponent = Spin,
  currentUserQuery = CURRENT_USER,
  children,
}: AuthWrapperProps): React.ReactNode => {
  const { currentUser, setCurrentUser } = useCurrentUser() as {
    currentUser: { id: string } | null | undefined
    setCurrentUser: (user: unknown) => void
  }

  const { loading } = useQuery(currentUserQuery, {
    skip: !!currentUser,
    onCompleted: ({ currentUser: fetchedUser }: { currentUser: unknown }) => {
      setCurrentUser(fetchedUser)
    },
    onError: error => {
      // Make sure 'currentUser' is defined and null so that RequireAuth knows
      // to clear the current (corrupted) token.
      // Note on session states:
      //  * undefined: current user remains unresolved
      //  * null: current user is resolved but unauthorised or token invalid
      setCurrentUser(null)
      console.error(error)
    },
  })

  useSubscription(USER_UPDATED_SUBSCRIPTION, {
    skip: !currentUser,
    variables: { userId: currentUser?.id },
    onData: ({ data }) => {
      const { userUpdated } = data.data as { userUpdated: unknown }
      setCurrentUser(userUpdated)
    },
  })

  return (
    <LoadingComponent spinning={loading && !currentUser}>
      {children}
    </LoadingComponent>
  )
}

export default AuthWrapper

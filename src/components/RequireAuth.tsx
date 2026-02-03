import React, { ReactNode, useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useApolloClient } from '@apollo/client/react'

import { get } from '../toolkit/funcs'
import { useCurrentUser } from '../helpers/useCurrentUser'

const requiredFields = [
  'id',
  'displayName',
  'username',
  'defaultIdentity.id',
  'defaultIdentity.isVerified',
]

type User = {
  id: string
  displayName: string
  username: string
  defaultIdentity?: {
    id: string
    isVerified: boolean
  }
}

const checkForRequiredFields = (user: User): boolean => {
  const fieldsMissing = requiredFields.some(k => {
    return typeof get(user as Record<string, unknown>, k) === 'undefined'
  })

  return !fieldsMissing
}

type RequireAuthProps = {
  notAuthenticatedRedirectTo?: string
  cleanUp?: () => void
  children?: ReactNode
  requireIdentityVerification?: boolean
  notVerifiedRedirectTo?: string
}

const RequireAuth = ({
  notAuthenticatedRedirectTo = '/login',
  cleanUp = () => {},
  children,
  requireIdentityVerification = true,
  notVerifiedRedirectTo = '/ensure-verified-login',
}: RequireAuthProps): React.ReactNode => {
  const client = useApolloClient()
  const location = useLocation()
  const { currentUser } = useCurrentUser()

  useEffect(() => {
    if (currentUser) {
      const requiredFieldsExist = checkForRequiredFields(currentUser)

      if (!requiredFieldsExist) {
        throw new Error(
          `Your current user query is missing some required fields! Make sure that the query requests the following fields: ${requiredFields.join(
            ', ',
          )}`,
        )
      }
    }
  }, [currentUser])

  if (!localStorage.getItem('token')) {
    client.cache.reset()
    cleanUp()

    const redirectUrl = `${notAuthenticatedRedirectTo}?next=${location.pathname}`
    return <Redirect to={redirectUrl} />
  }

  // if currentUser is undefined the context hasn't been set yet
  if (currentUser === undefined) {
    return null
  }

  // if currentUser is null it was set as a result of a failed authentication attempt (invalid token)
  if (currentUser === null) {
    client.cache.reset()
    localStorage.removeItem('token')

    return (
      <Redirect
        to={`${notAuthenticatedRedirectTo}?next=${location.pathname}`}
      />
    )
  }

  if (requireIdentityVerification) {
    const verified = currentUser?.defaultIdentity?.isVerified
    if (!verified) return <Redirect to={notVerifiedRedirectTo} />
  }

  return children
}

export default RequireAuth

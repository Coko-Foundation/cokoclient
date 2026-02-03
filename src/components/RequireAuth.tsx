import React, { ReactNode, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
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
  children?: ReactNode
  requireIdentityVerification?: boolean
  notVerifiedRedirectTo?: string
}

const RequireAuth = ({
  notAuthenticatedRedirectTo = '/login',
  children,
  requireIdentityVerification = true,
  notVerifiedRedirectTo = '/ensure-verified-login',
}: RequireAuthProps): React.ReactNode => {
  const client = useApolloClient()
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, error } = useCurrentUser()
  const token = localStorage.getItem('token')

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

  useEffect(() => {
    // not logged in
    if (!token) {
      const redirectUrl = `${notAuthenticatedRedirectTo}?next=${location.pathname}`
      navigate(redirectUrl, { replace: true })
    }
  }, [token])

  useEffect(() => {
    // failed authentication attempt
    if (!currentUser && error) {
      client.cache.reset()
      localStorage.removeItem('token')
      navigate(`${notAuthenticatedRedirectTo}?next=${location.pathname}`, {
        replace: true,
      })
    }

    if (currentUser && requireIdentityVerification) {
      const verified = currentUser.defaultIdentity?.isVerified
      if (!verified) navigate(notVerifiedRedirectTo, { replace: true })
    }
  }, [currentUser])

  return children
}

export default RequireAuth

import { ReactNode, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useMutation } from '@apollo/client/react'
import { CREATE_OAUTH_IDENTITY } from './ProviderConnection.queries'
// import { useCurrentUser } from '../helpers/currentUserContext'
import ProviderConnection from '../ui/authentication/ProviderConnection'

type ProviderConnectionPageProps = {
  closeOnSuccess?: boolean
  delayOnSuccess?: number
  loadingMinimumTime?: number
  redirectOnSuccess?: boolean
  redirectUrlLabel?: string
}

const ProviderConnectionPage = (
  props: ProviderConnectionPageProps,
): ReactNode => {
  const {
    closeOnSuccess = false,
    delayOnSuccess = 1000,
    loadingMinimumTime = 1000,
    redirectOnSuccess = false,
    redirectUrlLabel,
  } = props

  const { provider } = useParams()
  const navigate = useNavigate()
  // const { currentUser } = useCurrentUser()
  const [successfullyConnected, setSuccessfullyConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  // Get query string arguments
  const {
    session_state: sessionState,
    code,
    next,
  } = Object.fromEntries(new URLSearchParams(window.location.search))

  const [createOAuthIdentity, { called: createOAuthIdentityCalled }] =
    useMutation(CREATE_OAUTH_IDENTITY, {
      variables: {
        provider,
        sessionState,
        code,
      },
      onCompleted: () => {
        setTimeout(() => {
          setLoading(false)
          setSuccessfullyConnected(true)

          setTimeout(() => {
            if (closeOnSuccess) window.close()

            if (!closeOnSuccess && redirectOnSuccess && next) {
              navigate(next)
            }
          }, delayOnSuccess)
        }, loadingMinimumTime)
      },
      onError: err => {
        if (err) console.error(err)

        setLoading(false)
        setSuccessfullyConnected(false)
      },
    })

  // if (currentUser && !createOAuthIdentityCalled) {
  if (!createOAuthIdentityCalled) {
    createOAuthIdentity()
  }

  return (
    <ProviderConnection
      closeOnSuccess={closeOnSuccess}
      connecting={loading}
      redirectUrlLabel={redirectUrlLabel}
      successfullyConnected={successfullyConnected}
    />
  )
}

export default ProviderConnectionPage

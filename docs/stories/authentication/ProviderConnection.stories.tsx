import { ReactNode, useState } from 'react'

import { ProviderConnection } from '../../../src/ui'

export const Base = (): ReactNode => (
  <ProviderConnection
    closeOnSuccess={false}
    connecting
    redirectUrlLabel="FAKE PAGE"
    successfullyConnected={false}
  />
)

export const SuccessWithClose = (): ReactNode => (
  <ProviderConnection closeOnSuccess successfullyConnected />
)

export const SuccessWithRedirect = (): ReactNode => (
  <ProviderConnection redirectUrlLabel="FAKE PAGE" successfullyConnected />
)

export const Error = (): ReactNode => <ProviderConnection />

export const SuccessFlow = (): ReactNode => {
  const [connecting, setConnecting] = useState(true)
  const [successfullyConnected, setSuccessfullyConnected] = useState(false)

  setTimeout(() => {
    setSuccessfullyConnected(true)
    setConnecting(false)
  }, 3000)

  return (
    <ProviderConnection
      closeOnSuccess
      connecting={connecting}
      successfullyConnected={successfullyConnected}
    />
  )
}

export const ErrorFlow = (): ReactNode => {
  const [connecting, setConnecting] = useState(true)

  setTimeout(() => {
    setConnecting(false)
  }, 3000)

  return (
    <ProviderConnection
      closeOnSuccess
      connecting={connecting}
      successfullyConnected={false}
    />
  )
}

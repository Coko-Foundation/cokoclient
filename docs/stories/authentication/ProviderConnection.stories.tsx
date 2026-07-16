/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'

import { ProviderConnection } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: ProviderConnection,
  title: 'Authentication/ProviderConnection',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <ProviderConnection
      closeOnSuccess={false}
      connecting
      redirectUrlLabel="FAKE PAGE"
      successfullyConnected={false}
    />
  ),
})

export const SuccessWithClose = meta.story({
  render: (): ReactElement => (
    <ProviderConnection closeOnSuccess successfullyConnected />
  ),
})

export const SuccessWithRedirect = meta.story({
  render: (): ReactElement => (
    <ProviderConnection redirectUrlLabel="FAKE PAGE" successfullyConnected />
  ),
})

export const Error = meta.story({
  render: (): ReactElement => <ProviderConnection />,
})

export const SuccessFlow = meta.story({
  render: (): ReactElement => {
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
  },
})

export const ErrorFlow = meta.story({
  render: (): ReactElement => {
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
  },
})

/* eslint-disable react-hooks/rules-of-hooks */

import { useState, ReactElement } from 'react'

import { Login } from '../../../src/ui'
import { Background } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Login,
  title: 'Authentication/Login',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <Background>
      <Login onSubmit={() => {}} />
    </Background>
  ),
})

export const FailingLogin = meta.story({
  render: (): ReactElement => {
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (): void => {
      setHasError(false)
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        setHasError(true)
      }, 2000)
    }

    return (
      <Background>
        <Login
          errorMessage="This is not a valid user / password combination"
          hasError={hasError}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </Background>
    )
  },
})

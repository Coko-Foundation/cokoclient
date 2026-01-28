import { useState } from 'react'

import { Login } from '../../../src/ui'
import { Background } from '../_helpers'

export const Base = () => (
  <Background>
    <Login onSubmit={() => {}} />
  </Background>
)

export const FailingLogin = () => {
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
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
}

import React, { useState } from 'react'
import { faker } from '@faker-js/faker'

import { Signup } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import { Background } from '../_helpers'

export const Base = (): React.ReactNode => (
  <Background>
    <Signup
      errorMessage={faker.lorem.sentence()}
      onSubmit={noop}
      termsAndConditionsContent={faker.lorem.sentences(5)}
      userEmail={faker.internet.email()}
    />
  </Background>
)

Base.args = {}

export const FailingSignup = (): React.ReactNode => {
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
      <Signup
        errorMessage="A user with this email already exists!"
        hasError={hasError}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </Background>
  )
}

export const SuccessfulSignup = (): React.ReactNode => {
  const [hasSuccess, setHasSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (): void => {
    setHasSuccess(false)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setHasSuccess(true)
    }, 2000)
  }

  return (
    <Background>
      <Signup
        hasSuccess={hasSuccess}
        loading={loading}
        onSubmit={handleSubmit}
        userEmail={faker.internet.email()}
      />
    </Background>
  )
}

export const SuccessScreen = (): React.ReactNode => {
  return (
    <Background>
      <Signup
        hasSuccess
        onSubmit={() => {}}
        userEmail={faker.internet.email()}
      />
    </Background>
  )
}

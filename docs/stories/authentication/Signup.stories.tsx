/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react'
import { faker } from '@faker-js/faker'

import { Signup } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import { Background } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Signup,
  title: 'Authentication/Signup',
})

export const Base = meta.story({
  render: (): React.ReactElement => (
    <Background>
      <Signup
        errorMessage={faker.lorem.sentence()}
        onSubmit={noop}
        termsAndConditionsContent={faker.lorem.sentences(5)}
      />
    </Background>
  ),
})

export const FailingSignup = meta.story({
  render: (): React.ReactElement => {
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
  },
})

export const SuccessfulSignup = meta.story({
  render: (): React.ReactElement => {
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
        />
      </Background>
    )
  },
})

export const SuccessScreen = meta.story({
  render: (): React.ReactElement => {
    return (
      <Background>
        <Signup hasSuccess onSubmit={() => {}} />
      </Background>
    )
  },
})

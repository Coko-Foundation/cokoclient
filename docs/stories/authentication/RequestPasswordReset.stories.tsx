import React from 'react'
import { faker } from '@faker-js/faker'

import { RequestPasswordReset } from '../../../src/ui'
import { Background } from '../_helpers'

const dummyArgs = {
  onSubmit: () => {},
}

const Template = args => (
  <Background>
    <RequestPasswordReset {...args} {...dummyArgs} />
  </Background>
)

export const Base = () => <Template></Template>

export const LoadingState = () => <Template loading></Template>

export const ErrorState = () => <Template hasError></Template>

export const SuccessfulState = () => (
  <Template hasSuccess userEmail={faker.internet.email()}></Template>
)

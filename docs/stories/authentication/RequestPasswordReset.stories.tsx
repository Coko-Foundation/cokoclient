import { ComponentProps, ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { RequestPasswordReset } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import { Background } from '../_helpers'

const Template = (
  props: ComponentProps<typeof RequestPasswordReset>,
): ReactNode => (
  <Background>
    <RequestPasswordReset {...props} />
  </Background>
)

export const Base = (): ReactNode => <Template onSubmit={noop}></Template>

export const LoadingState = (): ReactNode => (
  <Template loading onSubmit={noop}></Template>
)

export const ErrorState = (): ReactNode => (
  <Template hasError onSubmit={noop}></Template>
)

export const SuccessfulState = (): ReactNode => (
  <Template
    hasSuccess
    onSubmit={noop}
    userEmail={faker.internet.email()}
  ></Template>
)

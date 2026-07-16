import { ComponentProps, ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { RequestPasswordReset } from '../../../src/ui'
import { noop } from '../../../src/toolkit/funcs'
import { Background } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: RequestPasswordReset,
  title: 'Authentication/RequestPasswordReset',
})

const Template = (
  props: ComponentProps<typeof RequestPasswordReset>,
): ReactElement => (
  <Background>
    <RequestPasswordReset {...props} />
  </Background>
)

export const Base = meta.story({
  render: (): ReactElement => <Template onSubmit={noop}></Template>,
})

export const LoadingState = meta.story({
  render: (): ReactElement => <Template loading onSubmit={noop}></Template>,
})

export const ErrorState = meta.story({
  render: (): ReactElement => <Template hasError onSubmit={noop}></Template>,
})

export const SuccessfulState = meta.story({
  render: (): ReactElement => (
    <Template
      hasSuccess
      onSubmit={noop}
      userEmail={faker.internet.email()}
    ></Template>
  ),
})

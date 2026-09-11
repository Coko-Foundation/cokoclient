/* eslint-disable no-console */

import { ReactElement } from 'react'

import { noop } from '../../../src/toolkit/funcs'
import { VerifyEmail } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: VerifyEmail,
  title: 'Authentication/VerifyEmail',
})

const resend = (): void => console.log('resend')
const redirect = (): void => console.log('redirect')

export const Base = meta.story({
  render: (): ReactElement => (
    <VerifyEmail redirectToLogin={noop} resend={noop} verifying />
  ),
})

export const Success = meta.story({
  render: (): ReactElement => (
    <VerifyEmail
      redirectToLogin={redirect}
      resend={noop}
      successfullyVerified
    />
  ),
})

export const AlreadyVerified = meta.story({
  render: (): ReactElement => (
    <VerifyEmail alreadyVerified redirectToLogin={redirect} resend={noop} />
  ),
})

export const Expired = meta.story({
  render: (): ReactElement => (
    <VerifyEmail expired redirectToLogin={noop} resend={resend} />
  ),
})

export const Resending = meta.story({
  render: (): ReactElement => (
    <VerifyEmail redirectToLogin={noop} resend={noop} resending />
  ),
})

export const Resent = meta.story({
  render: (): ReactElement => (
    <VerifyEmail redirectToLogin={noop} resend={noop} resent />
  ),
})

export const Error = meta.story({
  render: (): ReactElement => (
    <VerifyEmail redirectToLogin={noop} resend={noop} />
  ),
})

/* eslint-disable no-console */

import { ReactNode } from 'react'

import { noop } from '../../../src/toolkit/funcs'
import { VerifyEmail } from '../../../src/ui'

const resend = (): void => console.log('resend')
const redirect = (): void => console.log('redirect')

export const Base = (): ReactNode => (
  <VerifyEmail redirectToLogin={noop} resend={noop} verifying />
)

export const Success = (): ReactNode => (
  <VerifyEmail redirectToLogin={redirect} resend={noop} successfullyVerified />
)

export const AlreadyVerified = (): ReactNode => (
  <VerifyEmail alreadyVerified redirectToLogin={redirect} resend={noop} />
)

export const Expired = (): ReactNode => (
  <VerifyEmail expired redirectToLogin={noop} resend={resend} />
)

export const Resending = (): ReactNode => (
  <VerifyEmail redirectToLogin={noop} resend={noop} resending />
)

export const Resent = (): ReactNode => (
  <VerifyEmail redirectToLogin={noop} resend={noop} resent />
)

export const Error = (): ReactNode => (
  <VerifyEmail redirectToLogin={noop} resend={noop} />
)

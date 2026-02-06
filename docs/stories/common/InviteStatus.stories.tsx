import { ReactNode } from 'react'

import { InviteStatus } from '../../../src/ui'

export const Base = (): ReactNode => <InviteStatus>some status</InviteStatus>

export const Success = (): ReactNode => (
  <InviteStatus status="success">accepted</InviteStatus>
)

export const Error = (): ReactNode => (
  <InviteStatus status="error">rejected</InviteStatus>
)

export const Warn = (): ReactNode => (
  <InviteStatus status="warning">watch out</InviteStatus>
)

export const Primary = (): ReactNode => (
  <InviteStatus status="primary">primary</InviteStatus>
)

export const NeutralReverse = (): ReactNode => (
  <InviteStatus reverseColors>neutral</InviteStatus>
)

export const SuccessReverse = (): ReactNode => (
  <InviteStatus reverseColors status="success">
    success
  </InviteStatus>
)

export const ErrorReverse = (): ReactNode => (
  <InviteStatus reverseColors status="error">
    error
  </InviteStatus>
)

export const WarnReverse = (): ReactNode => (
  <InviteStatus reverseColors status="warning">
    watch out
  </InviteStatus>
)

export const PrimaryReverse = (): ReactNode => (
  <InviteStatus reverseColors status="primary">
    primary
  </InviteStatus>
)

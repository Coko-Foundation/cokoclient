import { ReactElement } from 'react'

import { InviteStatus } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: InviteStatus,
  title: 'Common/InviteStatus',
})

export const Base = meta.story({
  render: (): ReactElement => <InviteStatus>some status</InviteStatus>,
})

export const Success = meta.story({
  render: (): ReactElement => (
    <InviteStatus status="success">accepted</InviteStatus>
  ),
})

export const Error = meta.story({
  render: (): ReactElement => (
    <InviteStatus status="error">rejected</InviteStatus>
  ),
})

export const Warn = meta.story({
  render: (): ReactElement => (
    <InviteStatus status="warning">watch out</InviteStatus>
  ),
})

export const Primary = meta.story({
  render: (): ReactElement => (
    <InviteStatus status="primary">primary</InviteStatus>
  ),
})

export const NeutralReverse = meta.story({
  render: (): ReactElement => (
    <InviteStatus reverseColors>neutral</InviteStatus>
  ),
})

export const SuccessReverse = meta.story({
  render: (): ReactElement => (
    <InviteStatus reverseColors status="success">
      success
    </InviteStatus>
  ),
})

export const ErrorReverse = meta.story({
  render: (): ReactElement => (
    <InviteStatus reverseColors status="error">
      error
    </InviteStatus>
  ),
})

export const WarnReverse = meta.story({
  render: (): ReactElement => (
    <InviteStatus reverseColors status="warning">
      watch out
    </InviteStatus>
  ),
})

export const PrimaryReverse = meta.story({
  render: (): ReactElement => (
    <InviteStatus reverseColors status="primary">
      primary
    </InviteStatus>
  ),
})
